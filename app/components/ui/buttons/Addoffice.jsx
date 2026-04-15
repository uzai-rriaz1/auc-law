"use client";
import React from "react";
import { Plus } from "lucide-react";
import { Form, useForm } from "react-hook-form";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const Addoffice = ({ name, className }) => {
  const {
    handleSubmit,
    register,
    resetField,

    formState: { errors },
  } = useForm();

  const officeMutation = useMutation({
    mutationFn: async (data) => {
      try {
        const res = await axios.post(
          "https://aucapi-staging.villaextech.com/offices",
          data,
        );
        if (res) console.log(res);
      } catch (error) {
        console.log("data not sended", error);
      }
    },
  });

  const handleclick = (e) => {
    e.preventDefault();
    const dialog = document.getElementById("form-modal");
    dialog.showModal();
  };

  const onsubmit = async (data) => {
    officeMutation.mutate(data);

    const form = document.getElementById("office-form");
    form.reset();
  };

  return (
    <>
      <dialog
        id="form-modal"
        className="bg-white h-[80vh] w-[35vw] absolute top-25 left-1/3 text-center rounded-2xl"
      >
        <form
          id="office-form"
          onSubmit={handleSubmit(onsubmit)}
          action=""
          className="flex flex-col items-center justify-center gap-6 mt-5"
        >
          <h1 className="text-start">Add New Office</h1>
          <input
            hidden
            value={18}
            type="text"
            {...register("organisation_id", { required: true })}
            className="w-sm p-3 rounded-2xl outline-1 shadow-2xl outline-gray-200"
          />
          <input
            placeholder="Enter Your Office Name eg. Islamabad Main Office"
            type="text"
            {...register("name", { required: true })}
            className="w-sm p-3 rounded-2xl outline-1 shadow-2xl outline-gray-200"
          />
          <input
            placeholder="Enter City"
            type="text"
            {...register("city", { required: true })}
            className="w-sm p-3 rounded-2xl outline-1 shadow-2xl outline-gray-200"
          />
          <input
            placeholder="Enter Address"
            type="text"
            {...register("address", {})}
            className="w-sm p-3 rounded-2xl outline-1 shadow-2xl outline-gray-200"
          />
          <input
            placeholder="Enter Email"
            type="text"
            {...register("email", {})}
            className="w-sm p-3 rounded-2xl outline-1 shadow-2xl outline-gray-200"
          />
          <input
            placeholder="Enter Phone eg. +920000000000"
            type="text"
            {...register("phone", {
              pattern: {
                value: /^\+92\d{10}$/,
                message:
                  "Number Should Start with +92 and 10 digits after this",
              },
              minLength: 11,
            })}
            className="w-sm p-3 rounded-2xl outline-1 shadow-2xl outline-gray-200"
          />
          <div className="flex items-center justify-center gap-5">
            <button
              onClick={(e) => {
                e.preventDefault();
                const dialog = document.getElementById("form-modal");
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
              Add
            </button>
          </div>
        </form>
      </dialog>

      <button onClick={handleclick} className={className}>
        <Plus size={20} />
        {name}
      </button>
    </>
  );
};

export default Addoffice;
