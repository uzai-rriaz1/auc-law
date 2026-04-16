"use client";
import { Building2 } from "lucide-react";
import { TrendingUp } from "lucide-react";
import Adddepartment from "../ui/buttons/Adddepartment";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import axios from "axios";
import { Trash, Pencil, Plus } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

const DepartmentCard = () => {
  const { formState = { errors }, register, handleSubmit } = useForm();

  const handleClick = () => {};

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

  const OfficeMutation = useMutation({
    mutationKey: ["officedel"],
    mutationFn: async (office_id) => {
      try {
        const res = await axios.delete(
          `https://aucapi-staging.villaextech.com/offices/${office_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (res) console.log(res);
      } catch (error) {
        console.log("office didnt deleted", error);
      }
    },
  });

  const OfficeUpdate = useMutation({
    mutationKey: ["officeupdate"],
    mutationFn: async (office_id) => {
      try {
        const res = await axios.put(
          `https://aucapi-staging.villaextech.com/offices/${office_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (res) console.log(res);
      } catch (error) {
        console.log("office didnt deleted", error);
      }
    },
  });

  return (
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
        {data ? (
          <div>
            {data.map((office) => (
              <div
                key={office.id}
                className="bg-white p-4 mt-2 shadow-lg mr-1 outline-1 border-2 border-white outline-white rounded-2xl"
              >
                {
                  <dialog
                    id="form-modal"
                    className="bg-white h-[80vh] w-[35vw] absolute top-25 left-1/3 text-center rounded-2xl"
                  >
                    <form
                      id="office-form"
                      action=""
                      className="flex flex-col items-center justify-center gap-6 mt-5"
                    >
                      <h1 className="text-start">Add New Office</h1>

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
                            const dialog =
                              document.getElementById("form-modal");
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
                  </dialog>
                }
                <div className="flex items-center justify-between ">
                  <div className="flex justify-center items-center gap-1">
                    <p className="text-[18px] font-semibold text-gray-700 text-center">
                      {office.name}
                    </p>
                    <p className="text-[14px]  text-gray-500 text-center">
                      .{office.city}
                    </p>
                  </div>
                  <ul className="flex items-center justify-center gap-1 ">
                    <li className="p-0.5 pl-3 pr-3  rounded-2xl flex justify-center items-center hover:bg-blue-200 text-[14px] text-blue-600">
                      {<Plus size={15} />}Add Dept
                    </li>
                    <li className="p-2 rounded-xl flex justify-center items-center hover:bg-blue-200 text-[14px] text-blue-800">
                      {
                        <Pencil
                          size={15}
                          onClick={() => {
                            const form = document.getElementById("form-modal");
                            form.showModal();
                            OfficeUpdate.mutate(office.id);
                          }}
                        />
                      }
                    </li>
                    <li
                      onClick={() => {
                        OfficeMutation.mutate(office.id);
                      }}
                      className="p-2  rounded-xl flex justify-center items-center hover:bg-red-300 text-[14px] text-red-600"
                    >
                      {<Trash size={15} />}
                    </li>
                  </ul>
                </div>
                <div className="flex  items-center mt-2">
                  {office.departments.map((depart) => (
                    <ul key={depart.id} className="m-0.5">
                      <li
                        value={depart.name}
                        className={
                          depart.name === "Accounts"
                            ? "bg-amber-200 rounded-2xl text-[10px] p-2 font-bold text-amber-500"
                            : depart.name === "Corporate"
                              ? "bg-blue-300 rounded-2xl text-[10px] p-2 font-bold text-blue-800"
                              : depart.name === "Tax"
                                ? "bg-green-400 rounded-2xl text-[10px] p-2 pl-3 pr-3 font-bold text-green-800"
                                : depart.name === "Litigation"
                                  ? "bg-red-400 rounded-2xl text-[10px] p-2 pl-3 pr-3 font-bold text-red-600"
                                  : depart.name === "Intellectual Property"
                                    ? "bg-purple-400 rounded-2xl text-[10px] p-2 pl-3 pr-3 font-bold text-purple-800"
                                    : depart.name === "Registration"
                                      ? "bg-rose-200 rounded-2xl text-[10px] p-2 pl-3 pr-3 font-bold text-rose-600"
                                      : ""
                        }
                      >
                        {depart.name}
                      </li>
                    </ul>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-20 gap-5">
            <p className="flex flex-col items-center justify-center text-gray-300">
              <Building2 size={40} /> No Activity Yet
            </p>
            <button>Add Office</button>
          </div>
        )}
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
  );
};

export default DepartmentCard;
