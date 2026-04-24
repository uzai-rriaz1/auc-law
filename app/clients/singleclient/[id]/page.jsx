"use client";
import { useParams } from "next/navigation";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";

const page = () => {
  const { id } = useParams();
  const token = useSelector((state) => state.user.token);

  const { isFetching, data: client } = useQuery({
    queryKey: ["client", id],
    queryFn: async () => {
      const res = await axios.get(
        `https://aucapi-staging.villaextech.com/clients/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(res);
      return res?.data;
    },
    enabled: !!id,
  });

  return (
    <>
      {isFetching ? (
        <div className="flex justify-center items-center h-screen text-3xl">
          Loading
        </div>
      ) : (
        <div className="max-w-screen mx-auto flex flex-col gap-4 p-6">
          {/* Hero */}

          <div className="rounded-2xl p-7 flex flex-wrap items-center justify-between gap-6 bg-gradient-to-br from-indigo-500 via-violet-600 to-purple-600">
            {/* Left */}
            <div className="flex items-center gap-5">
              <div className="w-[72px] h-[72px] rounded-full bg-white/20 flex items-center justify-center text-white text-3xl font-medium shrink-0">
                {client?.head_name[0]}
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 bg-white/15 border border-white/30 rounded-full px-3 py-0.5 text-xs text-green-300 mb-1">
                  <span className="w-2 h-2 rounded-full bg-green-400" />
                  Active
                </div>
                <h2 className="text-white text-xl font-medium leading-tight">
                  {client?.head_name}
                </h2>
                <div className="flex flex-wrap gap-4 mt-1.5">
                  <span className="flex items-center gap-1.5 text-white/70 text-xs">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 1.5C5.5 1.5 3.5 3.5 3.5 6c0 3.5 4.5 8.5 4.5 8.5S12.5 9.5 12.5 6c0-2.5-2-4.5-4.5-4.5z" />
                      <circle cx="8" cy="6" r="1.5" />
                    </svg>
                    {client?.city}
                  </span>
                  <span className="flex items-center gap-1.5 text-white/70 text-xs">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      viewBox="0 0 16 16"
                    >
                      <rect x="2" y="4" width="12" height="9" rx="1.5" />
                      <path d="M2 6.5l6 4 6-4" />
                    </svg>
                    {client?.email}
                  </span>
                  <span className="flex items-center gap-1.5 text-white/70 text-xs">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3 2.5h2.5l1 2.5-1.5 1c.8 1.6 2 2.8 3.5 3.5l1-1.5 2.5 1V12c0 .8-.7 1.5-1.5 1.5C5.5 13.5 2.5 7.5 2.5 4 2.5 3.2 3.2 2.5 3 2.5z" />
                    </svg>
                    {client?.mobile_no}
                  </span>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-white/15 rounded-xl p-2.5 text-center">
                <div className="text-white text-xl font-medium">0</div>
                <div className="text-white/60 text-[9px] uppercase tracking-wider mt-0.5">
                  Total Cases
                </div>
              </div>
              <div className="bg-white/15 rounded-xl p-2.5 text-center">
                <div className="text-white text-xl font-medium">0</div>
                <div className="text-white/60 text-[9px] uppercase tracking-wider mt-0.5">
                  Total Tasks
                </div>
              </div>
              <div className="bg-white/15 rounded-xl p-2.5 text-center row-span-2 flex flex-col items-center justify-center">
                <div className="text-white text-xl font-medium">0</div>
                <div className="text-white/60 text-[9px] uppercase tracking-wider mt-0.5">
                  Contacts
                </div>
              </div>
              <div className="bg-white/15 rounded-xl p-2.5 text-center">
                <div className="text-white text-xl font-medium">0</div>
                <div className="text-white/60 text-[9px] uppercase tracking-wider mt-0.5">
                  Active Cases
                </div>
              </div>
              <div className="bg-white/15 rounded-xl p-2.5 text-center">
                <div className="text-white text-xl font-medium">0</div>
                <div className="text-white/60 text-[9px] uppercase tracking-wider mt-0.5">
                  Active Tasks
                </div>
              </div>
              <div className="bg-white/15 rounded-xl p-2.5 text-center">
                <div className="text-white text-xl font-medium">0</div>
                <div className="text-white/60 text-[9px] uppercase tracking-wider mt-0.5">
                  Completed Cases
                </div>
              </div>
              <div className="bg-white/15 rounded-xl p-2.5 text-center">
                <div className="text-white text-xl font-medium">0</div>
                <div className="text-white/60 text-[9px] uppercase tracking-wider mt-0.5">
                  Completed Tasks
                </div>
              </div>
              <div />
            </div>
          </div>

          {/* Cases */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-gray-100">
              <svg
                className="text-amber-500 shrink-0"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
                viewBox="0 0 18 18"
              >
                <rect x="2" y="5" width="14" height="11" rx="1.5" />
                <path d="M6 5V4a3 3 0 0 1 6 0v1" />
              </svg>
              <span className="text-sm font-medium text-gray-800">Cases</span>
              <span className="ml-1 bg-gray-100 text-gray-500 text-xs rounded-full px-2 py-0.5">
                0
              </span>
            </div>
            <div className="flex flex-col items-center justify-center py-10 gap-2.5">
              <svg
                className="w-10 h-10 text-gray-300"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 40 40"
              >
                <rect x="4" y="12" width="32" height="24" rx="3" />
                <path d="M14 12v-2a6 6 0 0 1 12 0v2" />
              </svg>
              <span className="text-sm text-gray-400">
                No cases found for this client.
              </span>
            </div>
          </div>

          {/* Tasks */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-gray-100">
              <svg
                className="text-amber-500 shrink-0"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
                viewBox="0 0 18 18"
              >
                <rect x="3" y="2" width="12" height="14" rx="1.5" />
                <line x1="6" y1="6" x2="12" y2="6" />
                <line x1="6" y1="9" x2="12" y2="9" />
                <line x1="6" y1="12" x2="10" y2="12" />
              </svg>
              <span className="text-sm font-medium text-gray-800">Tasks</span>
              <span className="ml-1 bg-gray-100 text-gray-500 text-xs rounded-full px-2 py-0.5">
                0
              </span>
            </div>
            <div className="flex flex-col items-center justify-center py-10 gap-2.5">
              <svg
                className="w-10 h-10 text-gray-300"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 40 40"
              >
                <rect x="6" y="4" width="28" height="32" rx="3" />
                <line x1="13" y1="14" x2="27" y2="14" />
                <line x1="13" y1="20" x2="27" y2="20" />
                <line x1="13" y1="26" x2="21" y2="26" />
              </svg>
              <span className="text-sm text-gray-400">
                No tasks found for this client.
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default page;
