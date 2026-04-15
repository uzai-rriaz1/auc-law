import React from "react";
import Addoffice from "../components/ui/buttons/Addoffice";
import Adddepartment from "../components/ui/buttons/Adddepartment";
import { Briefcase } from "lucide-react";
import { CalendarCheck } from "lucide-react";
import { UsersRound } from "lucide-react";
import { UserCheck } from "lucide-react";
import { Building2 } from "lucide-react";
import { TrendingUp } from "lucide-react";

const Dashboard = () => {
  const handleclick = () => {};
  return (
    <>
      <div className="flex  justify-between items-center">
        <div>
          <h1 className="font-bold text-2xl">Admin Dashboard</h1>
          <p className="text-gray-500 text-[14px]">
            Organisation-wide overview across all offices and departments
          </p>
        </div>

        <Addoffice
          name="Add Office"
          className={`bg-blue-600 border-2 border-blue-500 p-2 px-5 text-white rounded-2xl flex justify-center items-center gap-1`}
        />
      </div>
      <section title="cards" className="grid grid-cols-4 mt-4">
        <div className=" relative flex justify-between items-center p-7 rounded-2xl ml-0.5 bg-white border-2 border-white shadow-2xl shadow-olive-100">
          <div className="">
            <h1 className="font-semibold text-gray-500">Total Cases</h1>
            <h1 className="text-3xl font-bold">0</h1>
            <h4 className="text-gray-500 text-[12px]">0 active</h4>
          </div>
          <Briefcase
            size={43}
            color="blue"
            className="relative -top-5 right-1 bg-blue-100 p-3 rounded-xl"
          />
        </div>
        <div className="flex justify-between items-center p-7 rounded-2xl ml-0.5 bg-white border-b-2 border-white shadow-2xl shadow-olive-100">
          <div className="">
            <h1 className="font-semibold text-gray-500">Team Members</h1>
            <h1 className="text-3xl font-bold">0</h1>
            <h4 className="text-gray-500 text-[12px]">0 active</h4>
          </div>
          <UsersRound
            size={43}
            color="purple"
            className="relative -top-5 right-1 bg-purple-100 p-3 rounded-xl"
          />
        </div>
        <div className="flex justify-between items-center p-7 rounded-2xl ml-0.5 bg-white border-b-2 border-white shadow-2xl shadow-olive-100">
          <div>
            <h1 className="font-semibold text-gray-500">Clients</h1>
            <h1 className="text-3xl font-bold">0</h1>
            <h4 className="text-gray-500 text-[12px]">0 active</h4>
          </div>
          <UserCheck
            size={43}
            color="green"
            className="relative -top-5 right-1 bg-green-100 p-3 rounded-xl"
          />
        </div>
        <div className="flex justify-between items-center p-7 rounded-2xl ml-0.5 bg-white border-b-2 border-white shadow-2xl shadow-olive-100">
          <div>
            <h1 className="font-semibold text-gray-500">Tasks</h1>
            <h1 className="text-3xl font-bold">0</h1>
            <h4 className="text-gray-500 text-[12px]">0 active</h4>
          </div>
          <CalendarCheck
            size={43}
            color="orange"
            className="relative -top-5 right-1 bg-orange-100 p-3 rounded-xl"
          />
        </div>
      </section>
      <section title="office" className="grid grid-cols-2 mt-10 gap-3">
        <div className="border-2 border-white shadow-sm pt-2 pb-2 pl-2 rounded-2xl">
          <div className="flex justify-between items-center">
            <h1 className="flex gap-1 justify-center items-center font-bold text-[16px]">
              <Building2 size={19} className="text-gray-400" /> Offices &
              Departments
            </h1>
            <Adddepartment
              name={" Add Department"}
              className="flex justify-center items-center gap-1 mr-10 pl-4 pr-4 p-1 bg-white rounded-xl  outline-1 outline-gray-200 text-[14px] hover:bg-gray-100"
            />
          </div>
          <div className="flex flex-col items-center justify-center mt-20 gap-5">
            <p className="flex flex-col items-center justify-center text-gray-300">
              <Building2 size={40} /> No Activity Yet
            </p>
            <button>Add Office</button>
          </div>
        </div>
        <div className="border-2 border-white shadow-sm pt-2 pb-2 pl-2 rounded-2xl">
          <div className="flex justify-between items-center">
            <h1 className="flex gap-1 justify-center items-center font-bold text-[16px]">
              <TrendingUp size={19} className="text-gray-400" />
              Team by Department
            </h1>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
