"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import axios from "axios";

export default function MemberInfo() {
  const token = useSelector((state) => state.user.token);
  const { id } = useParams();

  const { data: memberstats } = useQuery({
    queryKey: ["stats", id],
    queryFn: async () => {
      try {
        const res = await axios.get(
          `https://aucapi-staging.villaextech.com/team-members/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (res) console.log(res?.data);
        if (res) return res?.data;
      } catch (error) {
        throw new Error("Stats didn't get fetched");
      }
    },
    // enabled: !!id,
  });
  console.log("data:", memberstats);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-6 text-white flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white/20 text-xl font-bold">
            {memberstats?.fullname[0]}
          </div>
          <div>
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              {memberstats?.fullname}
              <span className="text-xs bg-green-400 text-white px-2 py-1 rounded-full">
                {memberstats?.is_active === true ? "Active" : "INACTIVE"}
              </span>
            </h2>
            <p className="text-sm opacity-90">{memberstats?.email}</p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="bg-white/20 px-4 py-2 rounded-lg text-sm">
            CASES{" "}
            <span className="font-bold ml-2">{memberstats?.active_cases}</span>
          </div>
          <div className="bg-white/20 px-4 py-2 rounded-lg text-sm">
            TASKS <span className="font-bold ml-2">0</span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-3 gap-6 mt-6">
        {/* Left */}
        <div className="col-span-2 space-y-6">
          {/* Contact & Location */}
          <div className="grid grid-cols-2 gap-6 bg-white p-5 rounded-xl shadow-sm">
            <div>
              <h3 className="font-semibold mb-3">Contact</h3>
              <p className="text-xs text-gray-500">EMAIL</p>
              <p className="mb-2">{memberstats?.email}</p>

              <p className="text-xs text-gray-500">MOBILE</p>
              <p>{memberstats?.mobile_no || "N/A"}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Location</h3>
              <p className="text-xs text-gray-500">ADDRESS</p>
              <p className="mb-2">{memberstats?.location || "N/A"}</p>

              <p className="text-xs text-gray-500">CITY</p>
              <p>{memberstats?.city || "N/A"}</p>
            </div>
          </div>

          {/* Professional Details */}
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <h3 className="font-semibold mb-4">Professional Details</h3>
            <div className="flex gap-4">
              <div className="bg-gray-100 px-4 py-3 rounded-lg text-sm">
                <p className="text-gray-500 text-xs">QUALIFICATION</p>
                <p>{memberstats?.qualification || "N/A"}</p>
              </div>

              <div className="bg-gray-100 px-4 py-3 rounded-lg text-sm">
                <p className="text-gray-500 text-xs">DESIGNATION</p>
                <p>{memberstats?.designation || "N/A"}</p>
              </div>

              <div className="bg-gray-100 px-4 py-3 rounded-lg text-sm">
                <p className="text-gray-500 text-xs">ADVOCATE</p>
                <p>{memberstats?.lower_courts || "N/A"}</p>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="bg-white p-5 rounded-xl shadow-sm flex justify-between items-center">
            <div>
              <h3 className="font-semibold">Member Status</h3>
              <p className="text-sm text-gray-500">
                Currently active and taking assignments
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-green-600 font-medium">Active</span>
              <div className="w-10 h-5 bg-blue-500 rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-0.5"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="space-y-6">
          {/* Department */}
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <h3 className="font-semibold mb-3">Department</h3>
            <div className="bg-indigo-50 p-3 rounded-lg">
              <p className="text-xs text-indigo-500">PRIMARY</p>
              <p className="font-medium">
                {memberstats?.primary_department || "N/A"}
              </p>
            </div>
          </div>

          {/* Important Dates */}
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <h3 className="font-semibold mb-3">Important Dates</h3>
            <p className="text-sm text-gray-500">No dates available</p>
          </div>

          {/* Performance */}
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <h3 className="font-semibold mb-3">Performance Stats</h3>

            <div className="text-sm space-y-2">
              <p>Total: 0</p>
              <p>Active: 0</p>
              <p className="text-green-600">Won: 0</p>
              <p className="text-red-500">Lost: 0</p>
            </div>

            <p className="text-xs text-gray-400 mt-3">No cases assigned</p>

            <hr className="my-4" />

            <p className="text-sm font-medium">Tasks Breakdown</p>
            <p className="text-xs text-gray-400">No tasks assigned</p>
          </div>
        </div>
      </div>
    </div>
  );
}
