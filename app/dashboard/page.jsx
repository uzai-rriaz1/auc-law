import React from "react";
import Button from "../components/ui/button/Button";
import { Briefcase } from "lucide-react";
import { CalendarCheck } from "lucide-react";
import { UsersRound } from "lucide-react";
import { UserCheck } from "lucide-react";
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

        <Button
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
    </>
  );
};

export default Dashboard;
