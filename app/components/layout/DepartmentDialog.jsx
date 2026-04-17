"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

const DepartmentDialog = () => {
  const { formState = { errors }, register, handleSubmit, reset } = useForm();
  const token = useSelector((state) => state.user.token);

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
    <form
      id="office-form"
      action=""
      className="flex flex-col items-center justify-center gap-6 mt-5"
    >
      <h1 className="text-start">Add New Office</h1>
      {data?.map((office) => (
        <select key={office.id}>
          <option value="">{office.name}</option>
        </select>
      ))}

      <input
        placeholder="Enter Phone eg. +920000000000"
        type="text"
        {...register("phone", {
          pattern: {
            value: /^\+92\d{10}$/,
            message: "Number Should Start with +92 and 10 digits after this",
          },
          minLength: 11,
        })}
        className="w-sm p-3 rounded-2xl outline-1 shadow-2xl outline-gray-200"
      />
      <div className="flex items-center justify-center gap-5">
        <button
          onClick={(e) => {
            e.preventDefault();
            const dialog = document.getElementById("department-modal");
            dialog.close();
          }}
          className="p-3 bg-gray-200 rounded-2xl shadow-lg"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="pl-5 pr-5 p-3 bg-blue-500 rounded-2xl shadow-lg"
        >
          Update
        </button>
      </div>
    </form>
  );
};

export default DepartmentDialog;
