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
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const Sidebar = () => {
  const [openOfficeId, setOpenOfficeId] = React.useState(null);
  const router = useRouter();

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
            <li
              onClick={() => router.push("/Cases")}
              className="text-gray-500 text-[13px] font-bold hover:text-gray-700 text-sm flex items-center gap-1"
            >
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
        <div className="mt-5">
          <p className="font-semibold text-gray-400 text-[10px] pl-2">
            DEPARTMENTS
          </p>

          <div className="mt-3 flex flex-col gap-4">
            {data?.map((office) => (
              <div key={office.id}>
                {/* Office Name */}
                <div
                  onClick={() =>
                    setOpenOfficeId(
                      openOfficeId === office.id ? null : office.id,
                    )
                  }
                  className="flex items-center justify-between px-2 text-sm text-gray-600 font-medium cursor-pointer"
                >
                  <span>{office.name}</span>
                  <span>{openOfficeId === office.id ? "⌃" : "⌄"}</span>
                </div>

                {/* Departments */}
                {openOfficeId === office.id && (
                  <ul className="mt-2 ml-6 flex flex-col gap-2">
                    {office?.departments
                      ?.filter((dep) => dep.office_id === office.id)
                      .map((dep) => (
                        <li
                          onClick={() =>
                            router.push(`/departments/${dep.name}`)
                          }
                          key={dep.id}
                          className={`flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer text-sm
                    ${
                      dep.name === "Litigation"
                        ? "bg-red-500 text-white"
                        : dep.name === "Registration"
                          ? "bg-gray-100"
                          : "text-gray-600 hover:bg-gray-100"
                    }`}
                        >
                          <span
                            className={`p-2 rounded-full text-xs
                      ${
                        dep.name === "Litigation"
                          ? "bg-white text-red-500"
                          : "bg-gray-200"
                      }`}
                          ></span>

                          {dep.name}
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AuthCheck>
  );
};

export default Sidebar;
