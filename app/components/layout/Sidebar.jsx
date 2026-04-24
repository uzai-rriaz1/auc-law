"use client";
import React from "react";
import { Briefcase } from "lucide-react";
import { CalendarCheck } from "lucide-react";
import { UsersRound } from "lucide-react";
import { UserCheck } from "lucide-react";
import { DollarSign } from "lucide-react";
import { MessageSquare } from "lucide-react";
import { LayoutDashboard } from "lucide-react";
import AuthCheck from "@/app/authWrapper/authCheck";
import { useRouter } from "next/navigation";
const Sidebar = () => {
  const router = useRouter();
  return (
    <AuthCheck>
      <div className="max-h-screen w-64 bg-white border-r border-gray-200 pt-0 mt-0">
        <div className="p-5 flex  items-center gap-2 border-b-2  border-gray-200">
          <h2 className="p-2 bg-blue-600 rounded-full text-white font-bold">
            AL
          </h2>
          <h1 className="font-bold">AUC Law</h1>
        </div>

        <div className="pt-3 pl-1">
          <p className="font-semibold text-gray-400 text-[10px] pl-2">
            ORGANIZATION
          </p>
          <ul className="pt-4 pl-3 flex flex-col gap-5">
            <li
              onClick={() => router.push("/dashboard/dashboard")}
              className="text-gray-500 text-[13px] font-bold hover:text-gray-700 text-sm flex items-center gap-1"
            >
              <LayoutDashboard
                size={30}
                className="bg-gray-200 p-2 rounded-xl "
              />
              Admin Dashboard
            </li>
            <li
              onClick={() => router.push("/Team")}
              className="text-gray-500 text-[13px] font-bold hover:text-gray-700 text-sm flex items-center gap-1"
            >
              <UsersRound size={30} className="bg-gray-200 p-2 rounded-xl " />{" "}
              Team
            </li>
            <li className="text-gray-500 text-[13px] font-bold hover:text-gray-700 text-sm flex items-center gap-1">
              <Briefcase size={30} className="bg-gray-200 p-2 rounded-xl " />
              Cases
            </li>
            <li
              onClick={() => router.push("/clients")}
              className="text-gray-500 text-[13px] font-bold hover:text-gray-700 text-sm flex items-center gap-1"
            >
              <UserCheck size={30} className="bg-gray-200 p-2 rounded-xl " />
              Clients
            </li>
            <li className="text-gray-500 text-[13px] font-bold hover:text-gray-700 text-sm flex items-center gap-1">
              <CalendarCheck
                size={30}
                className="bg-gray-200 p-2 rounded-xl "
              />
              Tasks
            </li>
            <li className="text-gray-500 text-[13px] font-bold hover:text-gray-700 text-sm flex items-center gap-1">
              <MessageSquare
                size={30}
                className="bg-gray-200 p-2 rounded-xl "
              />
              Community
            </li>
            <li className="text-gray-500 text-[13px] font-bold hover:text-gray-700 text-sm flex items-center gap-1">
              <DollarSign size={30} className="bg-gray-200 p-2 rounded-xl " />
              Accounts
            </li>
          </ul>
        </div>
      </div>
    </AuthCheck>
  );
};

export default Sidebar;
