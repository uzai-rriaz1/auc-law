"use client";
import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const TeamComponent = () => {
  const [search, setSearch] = React.useState("");
  const token = useSelector((state) => state.user.token);

  const {
    data: team,
    isError,
    isSuccess,
  } = useQuery({
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
        <button className="p-2 border-2  bg-blue-600 rounded-2xl border-blue-600 text-[15px] text-white pl-4 pr-4 hover:cursor-pointer">
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
          <div className="bg-white rounded-2xl p-5 shadow- hover:shadow-2xl border-2 border-gray-300">
            <div className="flex items-start justify-between">
              <div className="w-14 h-14 rounded-xl bg-purple-500 text-white flex items-center justify-center text-lg font-semibold">
                {memeber.fullname.at(0)}
              </div>

              <span className="text-xs px-3 py-1 rounded-full bg-purple-100 text-purple-600 font-medium">
                ACTIVE
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
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default TeamComponent;
