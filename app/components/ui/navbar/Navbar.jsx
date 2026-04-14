import React from "react";
import { Briefcase } from "lucide-react";
import { CalendarCheck } from "lucide-react";
import { UsersRound } from "lucide-react";
import { UserCheck } from "lucide-react";

const Navbar = () => {
  return (
    <div className="h-26 pl-0  pt-2 p-2 ">
      <nav className=" flex justify-between items-center border-b-2 border-gray-200 pb-2">
        <h2 className="text-[12px] font-bold pl-2">AUC Law</h2>
        <ul className="flex gap-4">
          <li className="flex justify-center items-center text-sm gap-2  pl-2 pr-2 bg-blue-100 rounded-full text-blue-600 ">
            <Briefcase size={12} /> Cases
          </li>
          <li className="flex justify-between items-center text-sm gap-2  pl-2 pr-2 bg-green-100 rounded-full text-green-600">
            <Briefcase size={12} color="green" />
            Active
          </li>
          <li className="flex justify-between items-center gap-2 text-sm pl-2 pr-2 bg-red-100 rounded-full text-red-600">
            {" "}
            <CalendarCheck size={12} />
            Tasks
          </li>
          <li className="flex justify-between items-center gap-2 text-sm pl-2 pr-2 bg-purple-100 rounded-full text-purple-600">
            {" "}
            <UsersRound size={12} /> Team
          </li>
          <li className="flex justify-between items-center gap-2 text-sm pl-2 pr-2 bg-blue-100 rounded-full text-blue-700">
            {" "}
            <UserCheck size={12} />
            Clients
          </li>
        </ul>
      </nav>
      <div className="pt-2 border-b-2 border-gray-200 pb-2">
        <input
          placeholder={`Search Cases, Clients or Documents... `}
          type="text"
          className="p-2 ml-2 w-sm bg-gray-200 rounded-xl h-8 text-sm"
        />
        <ul>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
