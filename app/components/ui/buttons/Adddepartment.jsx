"use client";
import React from "react";
import { Plus } from "lucide-react";

const Adddepartment = ({ onClick, name, className }) => {
  return (
    <button onClick={onClick} className={className}>
      <Plus size={18} className="text-gray-600" />
      {name}
    </button>
  );
};

export default Adddepartment;
