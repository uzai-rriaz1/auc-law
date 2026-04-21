"use client";
import React from "react";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Trash } from "lucide-react";

const TeamComponent = () => {
  const { formState, handleSubmit, register, reset } = useForm();
  const [search, setSearch] = React.useState("");

  const token = useSelector((state) => state.user.token);

  const { data } = useQuery({
    queryKey: ["offices"],
    queryFn: async () => {
      try {
        const res = await axios.get(
          "https://aucapi-staging.villaextech.com/offices",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (res) console.log(res);
        if (res) return res?.data;
      } catch (error) {
        throw new "Offices Didnt Got Fetched"();
      }
    },
    refetchInterval: 5000,
  });

  const { data: departList } = useQuery({
    queryKey: ["list"],
    queryFn: async () => {
      try {
        const res = await axios.get(
          `https://aucapi-staging.villaextech.com/departments`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (res) console.log(res.data);
        return res.data;
      } catch (error) {
        return "departs didnt fetched";
      }
    },
    // enabled: !!departofficeid,
    isError: (error) => {
      console.log("DEPART LIST FULL ERROR", error);
    },
    isSuccess: () => {
      console.log("DEPART LIST FETCHED ");
    },
  });

  const { data: team } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const res = await axios.get(
        "https://aucapi-staging.villaextech.com/team-members",

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (res) console.log(res.data);
      //   if (!res) console.log("data didnt fetched", res);
      return await res.data;
    },
    refetchOnWindowFocus: false,
    staleTime: 10000,
    retry: false,
  });

  const createMember = useMutation({
    mutationKey: ["createMember"],
    mutationFn: async (data) => {
      const res = await axios.post(
        "https://aucapi-staging.villaextech.com/team-members/",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (res) console.log(res.data);
      //   if (!res) console.log("data didnt fetched", res);
      return await res.data;
    },
    onError: (error) => {
      console.log("ERROR DETAIL →", error.response?.data);
    },

    refetchOnWindowFocus: false,
    staleTime: 10000,
    retry: false,
  });

  const onSubmit = async (data) => {
    try {
      await createMember.mutateAsync(data);
      reset();
      document.getElementById("member-modal").close();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredMembers =
    team?.filter((member) =>
      member?.fullname?.toLowerCase().includes(search.toLowerCase()),
    ) || [];

  return (
    <>
      <section id="team-heading" className="flex justify-between items-center">
        <div className="">
          <h1 className="text-2xl font-bold">Team Members</h1>
          <h3 className="text-gray-400">
            Manage your legal team and their assignments
          </h3>
        </div>
        <button
          onClick={() => {
            const modal = document.getElementById("member-modal");
            modal.showModal();
          }}
          className="p-2 border-2  bg-blue-600 rounded-2xl border-blue-600 text-[15px] text-white pl-4 pr-4 hover:cursor-pointer"
        >
          Add Member
        </button>
      </section>
      <section
        id="search"
        className="flex items-center justify-between gap-4 mb-6"
      >
        {/* Search Input */}
        <div className="flex items-center w-full max-w-md border rounded-xl px-3 py-2 bg-white shadow-sm">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search team members..."
            className="w-full outline-none text-sm"
          />
        </div>

        {/* Filter Dropdown */}
        <select className="border rounded-xl px-4 py-2 text-sm bg-white shadow-sm">
          <option>All Members</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </section>
      <section
        id="team-card"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredMembers?.map((memeber) => (
          <div
            key={memeber.id}
            className="bg-white rounded-2xl p-5 shadow- hover:shadow-2xl border-2 border-gray-300"
          >
            <div className="flex items-start justify-between">
              <div className="w-14 h-14 rounded-xl bg-purple-500 text-white flex items-center justify-center text-lg font-semibold">
                {memeber.fullname.at(0)}
              </div>

              <span className="text-xs px-3 py-1 rounded-full bg-purple-100 text-purple-600 font-medium">
                {memeber.is_active === true ? " Active" : "InActive"}
              </span>
            </div>

            <h2 className="mt-4 font-semibold text-lg">{memeber.fullname}</h2>

            <div className="flex gap-3 mt-4">
              <div className="flex-1 bg-gray-100 rounded-xl p-3 text-center">
                <p className="font-semibold">{memeber.active_cases}</p>
                <p className="text-xs text-gray-500">ACTIVE CASES</p>
              </div>

              <div className="flex-1 bg-gray-100 rounded-xl p-3 text-center">
                <p className="font-semibold">{memeber.active_tasks || 0}</p>
                <p className="text-xs text-gray-500">ACTIVE TASKS</p>
              </div>
            </div>

            <div className="mt-4 text-[13px] font-bold flex gap-1 bg-gray-100 rounded-xl p-3 text-sm text-gray-600">
              JOINING DATE: <p className="">{memeber.date_of_join}</p>
            </div>

            <button className="mt-3 w-full border rounded-xl py-2 text-sm text-purple-600 hover:bg-purple-50 transition">
              More info →
            </button>

            <div className="flex gap-3 mt-3">
              <button className="flex-1 border rounded-xl py-2 text-sm hover:bg-gray-50">
                View
              </button>
              <button className="flex-1 bg-blue-600 text-white rounded-xl py-2 text-sm hover:bg-blue-700">
                Edit
              </button>
              <button className="flex bg-red-500 text-white rounded-2xl p-2 hover:bg-red-400">
                <Trash className="text-gray-300" />
              </button>
            </div>
          </div>
        ))}
      </section>

      {
        <dialog id="member-modal">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          >
            <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white">
                <div>
                  <h2 className="text-lg font-semibold">Add Team Member</h2>
                  <p className="text-sm opacity-90">
                    Add a new member to your team
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const modal = document.getElementById("member-modal");
                    modal.close();
                  }}
                  className="text-xl"
                >
                  ×
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* BASIC INFO */}
                <div className="border rounded-xl p-4">
                  <h3 className="text-sm font-semibold mb-4 text-gray-700">
                    Basic Information
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-500">Full Name</label>
                      <input
                        {...register("fullname", {
                          required: true,
                        })}
                        className="w-full border rounded-xl px-3 py-2"
                        placeholder="Enter full name"
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
                      <label className="text-xs text-gray-500">Password</label>
                      <input
                        {...register("password", {
                          required: true,
                        })}
                        type="password"
                        className="w-full border rounded-xl px-3 py-2"
                        placeholder="Enter password"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-gray-500">Mobile No</label>
                      <input
                        defaultValue={""}
                        {...register("mobile_no", {})}
                        className="w-full border rounded-xl px-3 py-2"
                        placeholder="Enter mobile number"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-gray-500">
                        Alternate No
                      </label>
                      <input
                        defaultValue={""}
                        {...register("alternative_no", {})}
                        className="w-full border rounded-xl px-3 py-2"
                        placeholder="Enter alternate number"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-gray-500">
                        Date of Birth
                      </label>
                      <input
                        {...register("date_of_birth", {
                          setValueAs: (v) =>
                            v ? new Date(v).toISOString() : undefined,
                        })}
                        type="date"
                        className="w-full border rounded-xl px-3 py-2"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-gray-500">
                        Date of Joining
                      </label>
                      <input
                        {...register("date_of_join", {
                          setValueAs: (v) =>
                            v ? new Date(v).toISOString() : undefined,
                        })}
                        type="date"
                        className="w-full border rounded-xl px-3 py-2"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-gray-500">CNIC</label>
                      <input
                        defaultValue={""}
                        {...register("cnic", {})}
                        className="w-full border rounded-xl px-3 py-2"
                        placeholder="xxxxx-xxxxxxx-x"
                      />
                      <select
                        {...register("status", { required: true })}
                        name=""
                        id=""
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* DEPARTMENT */}
                <div className="border rounded-xl p-4">
                  <h3 className="text-sm font-semibold mb-4 text-gray-700">
                    Department Assignment
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-gray-500">
                        Primary Department
                      </label>
                      <select
                        {...register("primary_department_id", {
                          required: true,
                        })}
                        className="w-full border rounded-xl px-3 py-2"
                      >
                        {data?.map((officename) => (
                          <optgroup
                            key={officename.id}
                            label={officename?.name}
                          >
                            <input
                              {...register("organisation_id", {
                                required: true,
                              })}
                              type="hidden"
                              value={officename.organisation_id}
                            />
                            {departList
                              ?.filter(
                                (option) => option.office_id === officename.id,
                              )
                              .map((option) => (
                                <option key={option.id} value={option.id}>
                                  {option.name}
                                </option>
                              ))}
                          </optgroup>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs text-gray-500">
                        Secondary Departments
                      </label>
                      <select
                        multiple
                        {...register("secondary_department_ids", {
                          setValueAs: (v) => (v ? [Number(v)] : []),
                        })}
                        defaultValue={null}
                        className="w-full border rounded-xl px-3 py-2"
                      >
                        {data?.map((officename) => (
                          <optgroup
                            key={officename.id}
                            label={officename?.name}
                          >
                            {departList
                              ?.filter(
                                (option) => option.office_id === officename.id,
                              )
                              .map((option) => (
                                <option key={option.id} value={option.id}>
                                  {option.name}
                                </option>
                              ))}
                          </optgroup>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* PROFESSIONAL */}
                <div className="border rounded-xl p-4">
                  <h3 className="text-sm font-semibold mb-4 text-gray-700">
                    Professional Information
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-500">
                        Qualification
                      </label>
                      <input
                        defaultValue={""}
                        {...register("qualification")}
                        className="w-full border rounded-xl px-3 py-2"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-gray-500">
                        Designation
                      </label>
                      <input
                        defaultValue={""}
                        {...register("designation")}
                        className="w-full border rounded-xl px-3 py-2"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-gray-500">Advocate</label>
                      <select
                        defaultValue={""}
                        {...register("advocate")}
                        className="w-full border rounded-xl px-3 py-2"
                      >
                        <option value="Lower Court">Lower Court</option>
                        <option value="High Court">High Court</option>
                        <option value="Supreme Court">Supreme Court</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs text-gray-500">Role</label>
                      <select
                        {...register("role", { required: true })}
                        className="w-full border rounded-xl px-3 py-2"
                      >
                        <option value="AUTHORIZED_MEMBER">
                          Authorzid Member
                        </option>
                        <option value="RESTRICTED_MEMBER">
                          Restricted Member
                        </option>
                        <option value="ADMIN">Admin</option>
                        <option value="SUPER_ADMIN">Super Admin</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* ADDRESS */}
                <div className="border rounded-xl p-4">
                  <h3 className="text-sm font-semibold mb-4 text-gray-700">
                    Address Information
                  </h3>

                  <textarea
                    defaultValue={""}
                    {...register("address")}
                    className="w-full border rounded-xl px-3 py-2"
                    placeholder="Enter complete address"
                  />
                </div>

                {/* ENROLLMENT */}
                <div className="border rounded-xl p-4">
                  <h3 className="text-sm font-semibold mb-4 text-gray-700">
                    Enrollment Dates
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      {...register("lower_courts", {
                        setValueAs: (v) =>
                          v ? new Date(v).toISOString() : undefined,
                      })}
                      className="border rounded-xl px-3 py-2"
                      placeholder="Lower Courts"
                    />
                    <input
                      {...register("lower_court_date", {
                        setValueAs: (v) =>
                          v ? new Date(v).toISOString() : undefined,
                      })}
                      type="date"
                      className="border rounded-xl px-3 py-2"
                    />

                    <input
                      defaultValue={""}
                      {...register("higher_courts")}
                      className="border rounded-xl px-3 py-2"
                      placeholder="Higher Courts"
                    />
                    <input
                      {...register("higher_court_date", {
                        setValueAs: (v) =>
                          v ? new Date(v).toISOString() : undefined,
                      })}
                      type="date"
                      className="border rounded-xl px-3 py-2"
                    />

                    <input
                      defaultValue={""}
                      {...register("supreme_courts")}
                      className="border rounded-xl px-3 py-2"
                      placeholder="Supreme Court"
                    />
                    <input
                      {...register("supreme_court_date", {
                        setValueAs: (v) =>
                          v ? new Date(v).toISOString() : undefined,
                      })}
                      type="date"
                      className="border rounded-xl px-3 py-2"
                    />
                  </div>
                </div>

                {/* PHOTO */}
                {/* <div className="border rounded-xl p-4">
                  <h3 className="text-sm font-semibold mb-4 text-gray-700">
                    Photo
                  </h3>

                  <div className="border border-blue-200 rounded-xl p-5 bg-blue-50/40">
                    <div className="border-2 border-dashed border-blue-300 rounded-xl py-10 flex flex-col items-center justify-center text-center">
                      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-3 text-xl">
                        ⬆
                      </div>
                      <input
                        required={false}
                        accept="image/*"
                        type="file"
                        className="text-sm font-semibold text-gray-700"
                      ></input>
                      <p className="text-xs text-gray-400 mt-1">
                        JPG, JPEG, PNG, GIF up to 5MB
                      </p>
                    </div>
                  </div>
                </div> */}
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-3 px-6 py-4 border-t">
                <button
                  type="button"
                  onClick={() => {
                    const modal = document.getElementById("member-modal");
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
                  Add Member
                </button>
              </div>
            </div>
          </form>
        </dialog>
      }
    </>
  );
};

export default TeamComponent;
