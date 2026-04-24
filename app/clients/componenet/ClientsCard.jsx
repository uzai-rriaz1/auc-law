"use client";
import React, { useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { Trash, Eye, SquarePen } from "lucide-react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

const ClientsCard = () => {
  const router = useRouter();
  const token = useSelector((state) => state.user.token);

  const { register, reset, handleSubmit, setValue } = useForm({
    defaultValues: {
      organisation_id: 23,
      department_ids: [],
    },
  });

  const {
    register: register2,
    reset: reset2,
    handleSubmit: handleSubmit2,
    setValue: setValue2,
  } = useForm({
    defaultValues: {
      organisation_id: 23,
      department_ids: [],
    },
  });
  const queryClient = useQueryClient();
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [selected, setSelected] = React.useState([]);
  const [clientid, setClientid] = React.useState(null);

  const toggleSelect = (id) => {
    setSelected((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id];
      setValue("department_ids", updated); // keep RHF in sync
      return updated;
    });
  };

  const onSubmit = (data) => {
    createClient.mutate(data);
  };

  const { data } = useQuery({
    queryKey: ["offices"],
    queryFn: async () => {
      const res = await axios.get(
        "https://aucapi-staging.villaextech.com/offices",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return res?.data;
    },
  });

  const { data: client } = useQuery({
    queryKey: ["client", clientid],
    queryFn: async () => {
      const res = await axios.get(
        `https://aucapi-staging.villaextech.com/clients/${clientid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return res?.data;
    },
    enabled: !!clientid,
  });

  useEffect(() => {
    if (client) {
      const modal = document.getElementById("update-modal");
      modal.showModal();
      reset2({
        head_name: client.head_name,
        city: client.city,
        email: client.email,
        password: client.password,
        address: client.address,
        mobile_no: client.mobile_no,
        organisation_id: client.organisation_id,
        department_ids: client.department_ids,
      });
      setSelected(client.department_ids ?? []);
    }
  }, [client]);

  const onSubmit2 = (formData) => {
    UpdateClient.mutate({
      ...formData,
      department_ids: selected,
    });
  };

  const { data: departList } = useQuery({
    queryKey: ["list"],
    queryFn: async () => {
      const res = await axios.get(
        `https://aucapi-staging.villaextech.com/departments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return res.data;
    },
  });

  const { data: clients } = useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      const res = await axios.get(
        `https://aucapi-staging.villaextech.com/clients`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return res?.data;
    },
  });

  const createClient = useMutation({
    mutationKey: ["createClient"],
    mutationFn: async (data) => {
      const res = await axios.post(
        "https://aucapi-staging.villaextech.com/clients",
        {
          organisation_id: Number(data.organisation_id),
          head_name: data.head_name,
          email: data.email,
          password: data.password,
          mobile_no: data.mobile_no,
          city: data.city,
          address: data.address,
          status: "active",
          department_ids: data.department_ids.map(Number),
          associates: [],
          is_archived: false,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return res.data;
    },
    onError: (error) => {
      console.log("ERROR DETAIL →", error.response?.data);
    },
    onSuccess: () => {
      document.getElementById("client-modal")?.close();

      reset();
      setSelected([]);
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });

  const deleteClient = useMutation({
    mutationKey: ["deleteClient"],
    mutationFn: async (id) => {
      const res = await axios.delete(
        `https://aucapi-staging.villaextech.com/clients/${id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return res.data;
    },
    onError: (error) => {
      console.log("ERROR DETAIL →", error.response?.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });

  const UpdateClient = useMutation({
    mutationKey: ["UpdateClient"],
    mutationFn: async (data) => {
      const res = await axios.put(
        `https://aucapi-staging.villaextech.com/clients/${clientid}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return res.data;
    },
    onError: (error) => {
      console.log("ERROR DETAIL →", error.response?.data);
    },
    onSuccess: () => {
      document.getElementById("update-modal")?.close();

      reset2();
      setSelected([]);
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });

  return (
    <div className="min-h-screen bg-[#f5f7fb] p-6">
      {/* HEADER */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-xs tracking-widest text-purple-600 font-semibold">
            CLIENT COUNCIL
          </p>
          <h1 className="text-3xl font-bold text-gray-900">Client Registry</h1>
          <p className="text-gray-500 mt-1">Manage your client database</p>
        </div>

        <button
          onClick={() => document.getElementById("client-modal")?.showModal()}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-xl shadow hover:bg-blue-700 flex items-center gap-2"
        >
          + Add Client
        </button>
      </div>

      {/* SEARCH + FILTER */}
      <div className="flex gap-4 mb-8">
        <input
          placeholder="Search by name, city, company, email, or department..."
          className="flex-1 px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select className="px-4 py-3 border rounded-xl shadow-sm focus:outline-none">
          <option>All Clients</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-3 gap-6">
        {clients?.map((client) => (
          <div
            key={client.id}
            className="relative p-5 rounded-2xl bg-white shadow-md hover:shadow-xl transition"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gray-100 rounded-full flex items-start justify-center pt-4">
              <span className="text-xs text-blue-600 font-semibold">
                ACTIVE
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 flex items-center justify-center bg-indigo-500 text-white rounded-xl text-lg font-bold">
                {client.head_name[0]}
              </div>
              <div>
                <h2 className="font-semibold text-lg text-gray-900">
                  {client.head_name}
                </h2>
                <p className="text-sm text-gray-500 uppercase tracking-wide">
                  {client.city}
                </p>
              </div>
            </div>

            <button className="w-full mt-4 py-2 rounded-xl bg-gray-100 text-blue-600 hover:bg-gray-200 transition">
              More info →
            </button>

            <div className="flex gap-3 mt-5">
              <button
                onClick={() =>
                  router.push(`/clients/singleclient/${client.id}`)
                }
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl border hover:bg-gray-50"
              >
                <Eye size={16} /> View
              </button>
              <button
                onClick={() => setClientid(client.id)}
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-indigo-500 text-white hover:bg-indigo-600"
              >
                <SquarePen size={16} /> Edit
              </button>
              <button
                onClick={() => {
                  deleteClient.mutate(client.id);
                }}
                className="p-2 rounded-xl bg-red-500 text-white hover:bg-red-600"
              >
                <Trash size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <dialog
        id="client-modal"
        className="p-0 rounded-2xl backdrop:bg-black/40"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
        >
          <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center px-6 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-2xl">
              <div>
                <h2 className="text-xl font-semibold">Add New Client</h2>
                <p className="text-sm opacity-90">
                  Enter the client details below. All fields marked with * are
                  required.
                </p>
              </div>
              <button
                type="button"
                onClick={() => document.getElementById("client-modal")?.close()}
                className="text-xl border border-white/40 rounded px-2 hover:bg-white/10"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6 bg-gray-50">
              <div className="bg-white border rounded-xl p-5">
                <h3 className="text-sm font-semibold text-green-600 mb-4">
                  ● CLIENT INFORMATION
                </h3>

                <input type="hidden" {...register("organisation_id")} />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-500">Head Name *</label>
                    <input
                      {...register("head_name", { required: true })}
                      className="w-full border rounded-lg px-3 py-2 mt-1"
                      placeholder="Person's or company's name"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-500">City *</label>
                    <input
                      {...register("city", { required: true })}
                      className="w-full border rounded-lg px-3 py-2 mt-1"
                      placeholder="Enter city"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-500">Email *</label>
                    <input
                      {...register("email", { required: true })}
                      className="w-full border rounded-lg px-3 py-2 mt-1"
                      placeholder="client@example.com"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-500">Password *</label>
                    <input
                      {...register("password", {
                        required: true,
                        minLength: 8,
                      })}
                      type="password"
                      className="w-full border rounded-lg px-3 py-2 mt-1"
                      placeholder="Min. 8 characters"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="text-xs text-gray-500">Address</label>
                    <textarea
                      {...register("address")}
                      className="w-full border rounded-lg px-3 py-2 mt-1"
                      placeholder="Complete address"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-500">Mobile No *</label>
                    <input
                      {...register("mobile_no", { required: true })}
                      className="w-full border rounded-lg px-3 py-2 mt-1"
                      placeholder="+92300..."
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white border rounded-xl p-5">
                <h3 className="text-sm font-semibold text-purple-600 mb-3">
                  ● DEPARTMENTS
                </h3>

                <label className="text-xs text-gray-500">
                  Assign to Departments
                </label>

                <div
                  onClick={() => setOpen(!open)}
                  className="w-full border rounded-lg px-3 py-2 mt-2 cursor-pointer bg-white"
                >
                  {selected.length === 0 ? (
                    <span className="text-gray-400">Select departments...</span>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {selected.map((id) => {
                        const dept = departList?.find((d) => d.id === id);
                        return (
                          <span
                            key={id}
                            className="bg-blue-100 text-blue-600 px-2 py-1 rounded-md text-xs"
                          >
                            {dept?.name}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>

                {open && (
                  <div className="mt-2 border rounded-xl shadow bg-white max-h-60 overflow-y-auto">
                    <div className="p-2 border-b">
                      <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search..."
                        className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {data?.map((officename) => {
                      const filteredDepartments = departList?.filter(
                        (option) =>
                          option.office_id === officename.id &&
                          option.name
                            .toLowerCase()
                            .includes(search.toLowerCase()),
                      );

                      if (!filteredDepartments?.length) return null;

                      return (
                        <div key={officename.id} className="p-2">
                          <p className="text-xs text-gray-400 uppercase mb-1">
                            {officename?.name}
                          </p>
                          {filteredDepartments.map((option) => (
                            <div
                              key={option.id}
                              onClick={() => toggleSelect(option.id)}
                              className="flex justify-between items-center px-2 py-1 rounded hover:bg-gray-100 cursor-pointer"
                            >
                              <span>{option.name}</span>
                              {selected.includes(option.id) && (
                                <span className="text-blue-600">✓</span>
                              )}
                            </div>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                )}

                <input
                  type="hidden"
                  {...register("department_ids", { required: true })}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 px-6 py-4 border-t bg-white">
              <button
                type="button"
                onClick={() => document.getElementById("client-modal")?.close()}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={createClient.isPending}
                className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {createClient.isPending ? "Saving..." : "Add Client"}
              </button>
            </div>
          </div>
        </form>
      </dialog>

      <dialog
        id="update-modal"
        className="p-0 rounded-2xl backdrop:bg-black/40"
      >
        <form
          onSubmit={handleSubmit2(onSubmit2)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
        >
          <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center px-6 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-2xl">
              <div>
                <h2 className="text-xl font-semibold">Add New Client</h2>
                <p className="text-sm opacity-90">
                  Enter the client details below. All fields marked with * are
                  required.
                </p>
              </div>
              <button
                type="button"
                onClick={() => document.getElementById("update-modal")?.close()}
                className="text-xl border border-white/40 rounded px-2 hover:bg-white/10"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6 bg-gray-50">
              <div className="bg-white border rounded-xl p-5">
                <h3 className="text-sm font-semibold text-green-600 mb-4">
                  ● CLIENT INFORMATION
                </h3>

                <input type="hidden" {...register2("organisation_id")} />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-500">Head Name *</label>
                    <input
                      defaultValue={client?.head_name}
                      {...register2("head_name", { required: true })}
                      className="w-full border rounded-lg px-3 py-2 mt-1"
                      placeholder="Person's or company's name"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-500">City *</label>
                    <input
                      defaultValue={client?.city}
                      {...register2("city", { required: true })}
                      className="w-full border rounded-lg px-3 py-2 mt-1"
                      placeholder="Enter city"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-500">Email *</label>
                    <input
                      defaultValue={client?.email}
                      {...register2("email", { required: true })}
                      className="w-full border rounded-lg px-3 py-2 mt-1"
                      placeholder="client@example.com"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-500">Password *</label>
                    <input
                      defaultValue={client?.password}
                      {...register2("password", {
                        required: true,
                        minLength: 8,
                      })}
                      type="password"
                      className="w-full border rounded-lg px-3 py-2 mt-1"
                      placeholder="Min. 8 characters"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="text-xs text-gray-500">Address</label>
                    <textarea
                      defaultValue={client?.address}
                      {...register2("address")}
                      className="w-full border rounded-lg px-3 py-2 mt-1"
                      placeholder="Complete address"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-500">Mobile No *</label>
                    <input
                      defaultValue={client?.mobile_no}
                      {...register2("mobile_no", { required: true })}
                      className="w-full border rounded-lg px-3 py-2 mt-1"
                      placeholder="+92300..."
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white border rounded-xl p-5">
                <h3 className="text-sm font-semibold text-purple-600 mb-3">
                  ● DEPARTMENTS
                </h3>

                <label className="text-xs text-gray-500">
                  Assign to Departments
                </label>

                <div
                  onClick={() => setOpen(!open)}
                  className="w-full border rounded-lg px-3 py-2 mt-2 cursor-pointer bg-white"
                >
                  {selected.length === 0 ? (
                    <span className="text-gray-400">Select departments...</span>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {selected.map((id) => {
                        const dept = departList?.find((d) => d.id === id);
                        return (
                          <span
                            key={id}
                            className="bg-blue-100 text-blue-600 px-2 py-1 rounded-md text-xs"
                          >
                            {dept?.name}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>

                {open && (
                  <div className="mt-2 border rounded-xl shadow bg-white max-h-60 overflow-y-auto">
                    <div className="p-2 border-b">
                      <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search..."
                        className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {data?.map((officename) => {
                      const filteredDepartments = departList?.filter(
                        (option) =>
                          option.office_id === officename.id &&
                          option.name
                            .toLowerCase()
                            .includes(search.toLowerCase()),
                      );

                      if (!filteredDepartments?.length) return null;

                      return (
                        <div key={officename.id} className="p-2">
                          <p className="text-xs text-gray-400 uppercase mb-1">
                            {officename?.name}
                          </p>
                          {filteredDepartments.map((option) => (
                            <div
                              key={option.id}
                              onClick={() => toggleSelect(option.id)}
                              className="flex justify-between items-center px-2 py-1 rounded hover:bg-gray-100 cursor-pointer"
                            >
                              <span>{option.name}</span>
                              {selected.includes(option.id) && (
                                <span className="text-blue-600">✓</span>
                              )}
                            </div>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                )}

                <input
                  defaultValue={client?.department_ids}
                  type="hidden"
                  {...register2("department_ids", { required: true })}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 px-6 py-4 border-t bg-white">
              <button
                type="button"
                onClick={() => document.getElementById("update-modal")?.close()}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={UpdateClient.isPending}
                className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {UpdateClient.isPending ? "Saving..." : "Update Client"}
              </button>
            </div>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default ClientsCard;
