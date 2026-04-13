import React from "react";
import { Briefcase } from "lucide-react";
import { CalendarCheck } from "lucide-react";
import { UsersRound } from "lucide-react";
import { UserCheck } from "lucide-react";

const Navbar = () => {
  return (
    <div className="box-border pl-0 ml-28">
      <nav className=" flex justify-between">
        <h2>AUC Law</h2>
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
    </div>
  );
};

export default Navbar;
