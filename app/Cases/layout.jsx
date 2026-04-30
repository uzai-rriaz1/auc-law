import React from "react";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

const layout = ({ children }) => {
  return (
    <div className="max-h-[90vh] w-[98vw] flex ">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
};

export default layout;
