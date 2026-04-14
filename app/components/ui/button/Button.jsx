"use client";
import React from "react";
import { Plus } from "lucide-react";

const Button = ({ name, className }) => {
  const handleclick = () => {
    console.log("Button Clicked");
  };
  return (
    <button onClick={handleclick} className={className}>
      <Plus size={20} />
      {name}
    </button>
  );
};

export default Button;
