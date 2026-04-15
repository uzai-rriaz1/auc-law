"use client";
import React from "react";
import { Plus } from "lucide-react";

const Adddepartment = ({ name, className }) => {
  return (
    <button className={className}>
      <Plus size={18} className="text-gray-600" />
      {name}
    </button>
  );
};

export default Adddepartment;
