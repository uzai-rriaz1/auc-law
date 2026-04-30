"use client";

import axios from "axios";
import { useState } from "react";
import { Search, LayoutGrid, List, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export default function CasesPage() {
  const token = useSelector((state) => state.user.token);

  const [view, setView] = useState("grid");
  const [editingCase, setEditingCase] = useState(null);

  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, setValue } = useForm();

  /* ================= FETCH CASES ================= */
  const { data: casesData } = useQuery({
    queryKey: ["cases"],
    enabled: !!token,
    queryFn: async () => {
      const res = await axios.get(
        "https://aucapi-staging.villaextech.com/cases?skip=0&limit=10",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      return res.data;
    },
  });

  const cases = casesData?.data || casesData?.results || casesData || [];

  /* ================= FETCH CLIENTS ================= */
  const { data: clients } = useQuery({
    queryKey: ["clients"],
    enabled: !!token,
    queryFn: async () => {
      const res = await axios.get(
        "https://aucapi-staging.villaextech.com/clients",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      return res.data;
    },
  });

  const clientList = Array.isArray(clients) ? clients : [];

  /* ================= FETCH JUDGES ================= */
  const { data: judges } = useQuery({
    queryKey: ["judges"],
    enabled: !!token,
    queryFn: async () => {
      const res = await axios.get(
        "https://aucapi-staging.villaextech.com/judges",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      return res.data;
    },
  });

  const judgeList = Array.isArray(judges) ? judges : [];

  /* ================= FETCH DEPARTMENTS ================= */
  const { data: departList } = useQuery({
    queryKey: ["departments"],
    enabled: !!token,
    queryFn: async () => {
      const res = await axios.get(
        "https://aucapi-staging.villaextech.com/departments",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      return res.data;
    },
  });

  const departments = Array.isArray(departList) ? departList : [];

  const litigationDepartments = departments.filter((d) =>
    d.name?.toLowerCase().includes("litigation"),
  );

  /* ================= CREATE CASE ================= */
  const createMutation = useMutation({
    mutationFn: async (payload) => {
      const res = await axios.post(
        "https://aucapi-staging.villaextech.com/cases",
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cases"] });
      document.getElementById("case-modal").close();
      reset();
      setEditingCase(null);
    },
  });

  /* ================= UPDATE CASE ================= */
  const updateMutation = useMutation({
    mutationFn: async ({ id, payload }) => {
      const res = await axios.put(
        `https://aucapi-staging.villaextech.com/cases/${id}`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cases"] });
      document.getElementById("case-modal").close();
      reset();
      setEditingCase(null);
    },
  });

  const onSubmit = (data) => {
    const payload = {
      department_id: Number(data.department_id),
      client_id: Number(data.client_id),
      case_title: data.case_title,
      case_number: data.case_number,
      description: data.description,
      case_type: data.case_type,
      judge_id: Number(data.judge_id),
      court: data.court,
      filing_date: data.filing_date,
      case_status: data.case_status || "active",
      city: data.city,
      petitioner: [],
      responser: [],
      assigned_to: [],
      is_archived: false,
    };

    if (editingCase) {
      updateMutation.mutate({ id: editingCase.id, payload });
    } else {
      createMutation.mutate({
        organisation_id: 23,
        ...payload,
      });
    }
  };

  /* ================= DELETE CASE ================= */
  const deleteMutation = useMutation({
    mutationFn: async (caseId) => {
      await axios.delete(
        `https://aucapi-staging.villaextech.com/cases/${caseId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cases"] });
    },
  });

  /* ================= HANDLE EDIT ================= */
  const handleEdit = (c) => {
    setEditingCase(c);

    Object.keys(c).forEach((key) => {
      setValue(key, c[key]);
    });

    document.getElementById("case-modal").showModal();
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Cases</h1>

        <button
          onClick={() => {
            setEditingCase(null);
            reset();
            document.getElementById("case-modal").showModal();
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-xl flex items-center gap-2"
        >
          <Plus size={16} /> New Case
        </button>
      </div>

      {/* CASE GRID */}
      <div className="grid md:grid-cols-2 gap-6">
        {cases.map((c, i) => (
          <CaseCard
            key={c.id || i}
            data={c}
            clientList={clientList}
            judgeList={judgeList}
            onDelete={(id) => deleteMutation.mutate(id)}
            onEdit={() => handleEdit(c)}
          />
        ))}
      </div>

      {/* MODAL */}
      <CaseModal
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        clientList={clientList}
        judgeList={judgeList}
        litigationDepartments={litigationDepartments}
      />
    </div>
  );
}

/* ================= UPDATED CARD ================= */

function CaseCard({ data, clientList, judgeList, onDelete, onEdit }) {
  const clientName =
    clientList.find((c) => c.id === data.client_id)?.head_name || "Test";

  const judgeName =
    judgeList.find((j) => j.id === data.judge_id)?.name || "Unknown";

  return (
    <div className="bg-gray-100 p-5 rounded-2xl border shadow-sm">
      <div className="text-center">
        <h2 className="text-orange-500 font-semibold text-lg">
          {data.case_title || "nothing"}
        </h2>
        <p className="text-gray-400">—</p>
      </div>

      <div className="flex justify-end mt-2">
        <span className="text-green-600 bg-green-100 px-3 py-1 rounded-full text-xs font-medium">
          {data.case_status?.toUpperCase() || "ACTIVE"}
        </span>
      </div>

      <div className="text-sm text-gray-600 mt-4 space-y-2">
        <div className="flex justify-between">
          <p>⚖️ Judge:</p>
          <span className="font-medium">{judgeName}</span>
        </div>

        <div className="flex justify-between">
          <p>🏛️ Court:</p>
          <span className="text-indigo-600 font-medium">
            {data.court || "High Court"}
          </span>
        </div>

        <div className="flex justify-between">
          <p>👤 Client:</p>
          <span className="text-indigo-600">{clientName}</span>
        </div>

        <div className="flex justify-between">
          <p>👥 Follower:</p>
          <span>—</span>
        </div>

        <div className="flex justify-between">
          <p>📅 Last Date:</p>
          <span>—</span>
        </div>

        <div className="flex justify-between">
          <p>📅 Next Date:</p>
          <span>—</span>
        </div>

        <div className="flex justify-between">
          <p>📂 Assigned:</p>
          <span>Mudd...</span>
        </div>

        <div className="flex justify-between">
          <p>📁 Stage:</p>
          <span>—</span>
        </div>
      </div>

      <div className="flex gap-2 mt-5 flex-wrap">
        <button className="border px-3 py-1 rounded-lg text-xs bg-white">
          ☑ ADD TASK
        </button>
        <button className="border px-3 py-1 rounded-lg text-xs bg-white">
          📄 PROCEEDING
        </button>
        <button className="border px-3 py-1 rounded-lg text-xs bg-white">
          💬 COMMUNICATE
        </button>
      </div>

      <div className="flex justify-between items-center mt-5">
        <button className="text-sm text-gray-500 flex items-center gap-1">
          👁 VIEW DETAILS
        </button>

        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="px-3 py-1 rounded-lg bg-gray-200 text-sm"
          >
            ✏️ EDIT
          </button>

          <button
            onClick={() => onDelete(data.id)}
            className="px-3 py-1 rounded-lg bg-red-100 text-red-600 text-sm"
          >
            🗑
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= MODAL (UNCHANGED) ================= */

function CaseModal({
  register,
  handleSubmit,
  onSubmit,
  clientList,
  judgeList,
  litigationDepartments,
}) {
  return (
    <dialog id="case-modal">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="fixed inset-0 bg-black/40 flex justify-center items-center"
      >
        <div className="bg-white w-full max-w-4xl rounded-2xl p-6 space-y-6">
          <h2>Create Case</h2>

          <div className="grid grid-cols-2 gap-4">
            <input
              {...register("case_title")}
              placeholder="Case Title"
              className="border p-2"
            />
            <input
              {...register("case_number")}
              placeholder="Case Number"
              className="border p-2"
            />

            <select {...register("client_id")} className="border p-2">
              <option value="">Select Client</option>
              {clientList.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.head_name}
                </option>
              ))}
            </select>

            <select {...register("judge_id")} className="border p-2">
              <option value="">Select Judge</option>
              {judgeList.map((j) => (
                <option key={j.id} value={j.id}>
                  {j.name}
                </option>
              ))}
            </select>

            <select {...register("department_id")} className="border p-2">
              <option value="">Select Litigation Department</option>
              {litigationDepartments.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>

            <input
              {...register("court")}
              placeholder="Court"
              className="border p-2"
            />
            <input
              {...register("city")}
              placeholder="City"
              className="border p-2"
            />
            <input
              type="date"
              {...register("filing_date")}
              className="border p-2"
            />

            <select {...register("case_status")} className="border p-2">
              <option value="active">Active</option>
              <option value="in-active">Inactive</option>
            </select>
          </div>

          <textarea
            {...register("description")}
            placeholder="Description"
            className="border p-2 w-full"
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => document.getElementById("case-modal").close()}
            >
              Cancel
            </button>
            <button className="bg-indigo-600 text-white px-4 py-2">
              Create Case
            </button>
          </div>
        </div>
      </form>
    </dialog>
  );
}
