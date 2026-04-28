"use client";
import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Search, Plus, MapPin, Eye, Pencil, Trash2 } from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

const Pageclient = () => {
  const token = useSelector((state) => state.user.token);
  const { formState, handleSubmit, register, reset } = useForm();
  const {
    handleSubmit: handleSubmit2,
    register: register2,
    reset: reset2,
  } = useForm();

  const [id, setId] = useState(null);

  const queryClient = useQueryClient();

  const { data: judges, isLoading } = useQuery({
    queryKey: ["judges"],
    queryFn: async () => {
      const res = await axios.get(
        "https://aucapi-staging.villaextech.com/judges",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (res) console.log(res);
      if (res) return res?.data;
    },
  });

  const { data: judge } = useQuery({
    queryKey: ["judge", id],
    queryFn: async () => {
      const res = await axios.get(
        `https://aucapi-staging.villaextech.com/judges/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (res) console.log(res);
      if (res) return res?.data;
    },
    enabled: !!id,
  });

  const deleteJudge = useMutation({
    mutationKey: ["delete"],
    mutationFn: async (id) => {
      return axios.delete(
        `https://aucapi-staging.villaextech.com/judges/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["judges"],
      });
      console.log("JUDGE DELETED SUCCESS");
    },
  });

  const createJudge = useMutation({
    mutationKey: ["create"],
    mutationFn: async (data) => {
      return axios.post(`https://aucapi-staging.villaextech.com/judges`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      console.log("Judge Created");
      queryClient.invalidateQueries({
        queryKey: ["judges"],
      });
    },
    onError: (error) => {
      console.log("FULL ERROR", error);
    },
  });

  const updateJudge = useMutation({
    mutationKey: ["update"],
    mutationFn: async (data) => {
      return axios.put(
        `https://aucapi-staging.villaextech.com/judges/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    },
    onSuccess: () => {
      console.log("Judge updated");
      reset2();
      document.getElementById("update-modal").close();
      queryClient.invalidateQueries({
        queryKey: ["judges"],
      });
      queryClient.invalidateQueries({
        queryKey: ["judge", id],
      });
    },
    onError: (error) => {
      console.log("FULL ERROR", error);
    },
  });

  const Onsubmit = (data) => {
    createJudge.mutate(data);
    reset();
    const modal = document.getElementById("judge-modal");
    modal.close();
  };

  const onSubmit2 = (data) => {
    updateJudge.mutate(data);
    // reset2();
    // const modal = document.getElementById("update-modal");
    // modal.close();
  };

  useEffect(() => {
    if (judge) {
      reset2({
        name: judge.name,
        designation: judge.designation,
        city: judge.city,
        email: judge.email,
        phone: judge.phone,
        specialty: judge.specialty,
      });
    }
  }, [judge]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Judges</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage judge information and track case assignments
          </p>
        </div>

        <button
          onClick={() => {
            const modal = document.getElementById("judge-modal");
            modal.showModal();
          }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
        >
          <Plus size={16} />
          Add Judge
        </button>
      </div>

      <div className="mt-6 relative max-w-md">
        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search by name, city, designation, department, or cases..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center my-10">
          <h1>Loading Judges....</h1>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {judges?.map((judge, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow p-5 relative overflow-hidden border"
            >
              <span className="absolute top-4 right-4 text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-600">
                {judge.designation}
              </span>

              <div className="w-14 h-14 rounded-xl bg-orange-500 flex items-center justify-center text-white font-semibold text-lg shadow">
                {judge.name.charAt(0)}
              </div>

              <h3 className="mt-4 text-lg font-semibold text-gray-800">
                {judge.name}
              </h3>

              <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                <MapPin size={14} />
                {judge.city}
              </div>

              <div className="flex items-center gap-3 mt-5">
                <button className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg text-sm hover:bg-gray-200">
                  <Eye size={16} />
                  View
                </button>

                <button
                  onClick={() => {
                    setId(judge.id);
                    const modal = document.getElementById("update-modal");
                    modal.showModal();
                  }}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                >
                  <Pencil size={16} />
                </button>

                <button
                  onClick={() => deleteJudge.mutate(judge.id)}
                  className="p-2 rounded-lg bg-red-100 text-red-500 hover:bg-red-200"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-100 rounded-full opacity-30"></div>
            </div>
          ))}
        </div>
      )}

      <dialog id="judge-modal">
        <form
          onSubmit={handleSubmit(Onsubmit)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
        >
          <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white">
              <div>
                <h2 className="text-lg font-semibold">Add Judge</h2>
                <p className="text-sm opacity-90">Add a new Judge</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const modal = document.getElementById("judge-modal");
                  modal.close();
                }}
                className="text-xl"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="border rounded-xl p-4">
                <h3 className="text-sm font-semibold mb-4 text-gray-700">
                  Basic Information
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-500">Name</label>
                    <input
                      {...register("name", {
                        required: true,
                      })}
                      className="w-full border rounded-xl px-3 py-2"
                      placeholder="Enter full name"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Designation</label>
                    <input
                      defaultValue={""}
                      {...register("designation", {})}
                      className="w-full border rounded-xl px-3 py-2"
                      placeholder="Enter Your Designation"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">City</label>
                    <input
                      defaultValue={""}
                      {...register("city", {})}
                      className="w-full border rounded-xl px-3 py-2"
                      placeholder="Enter Your Designation"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-500">Email</label>
                    <input
                      {...register("email", {
                        required: true,
                      })}
                      className="w-full border rounded-xl px-3 py-2"
                      placeholder="Enter email"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-500">Phone No</label>
                    <input
                      defaultValue={""}
                      {...register("phone", {})}
                      className="w-full border rounded-xl px-3 py-2"
                      placeholder="Enter Phone number"
                    />
                    <label className="text-xs text-gray-500">Speciality</label>
                    <input
                      defaultValue={""}
                      {...register("specialty", {})}
                      className="w-full border rounded-xl px-3 py-2"
                      placeholder="e.g civil law"
                    />
                    <input
                      {...register("department_id", {
                        required: true,
                      })}
                      type="hidden"
                      value={116}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 px-6 py-4 border-t">
              <button
                type="button"
                onClick={() => {
                  const modal = document.getElementById("judge-modal");
                  modal.close();
                }}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg"
              >
                Add Judge
              </button>
            </div>
          </div>
        </form>
      </dialog>
      <dialog id="update-modal">
        2
        <form
          onSubmit={handleSubmit2(onSubmit2)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
        >
          <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white">
              <div>
                <h2 className="text-lg font-semibold">Update Judge</h2>
                <p className="text-sm opacity-90">Name Field is Mandatory</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const modal = document.getElementById("update-modal");
                  modal.close();
                }}
                className="text-xl"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="border rounded-xl p-4">
                <h3 className="text-sm font-semibold mb-4 text-gray-700">
                  Basic Information
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-500">Name</label>
                    <input
                      {...register2("name", {
                        required: true,
                      })}
                      className="w-full border rounded-xl px-3 py-2"
                      placeholder="Enter full name"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Designation</label>
                    <input
                      defaultValue={""}
                      {...register2("designation", {})}
                      className="w-full border rounded-xl px-3 py-2"
                      placeholder="Enter Your Designation"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">City</label>
                    <input
                      defaultValue={""}
                      {...register2("city", {})}
                      className="w-full border rounded-xl px-3 py-2"
                      placeholder="Enter Your Designation"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-500">Email</label>
                    <input
                      {...register2("email", {
                        required: true,
                      })}
                      className="w-full border rounded-xl px-3 py-2"
                      placeholder="Enter email"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-500">Phone No</label>
                    <input
                      defaultValue={""}
                      {...register2("phone", {})}
                      className="w-full border rounded-xl px-3 py-2"
                      placeholder="Enter Phone number"
                    />
                    <label className="text-xs text-gray-500">Speciality</label>
                    <input
                      defaultValue={""}
                      {...register2("specialty", {})}
                      className="w-full border rounded-xl px-3 py-2"
                      placeholder="e.g civil law"
                    />
                    <input
                      {...register2("department_id", {
                        required: true,
                      })}
                      type="hidden"
                      value={116}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 px-6 py-4 border-t">
              <button
                type="button"
                onClick={() => {
                  //   setId(null);
                  const modal = document.getElementById("update-modal");
                  modal.close();
                }}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg"
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default Pageclient;
