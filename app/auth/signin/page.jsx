"use client";
import React from "react";
import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Form, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../lib/redux/userSlice";
import { useRouter } from "next/navigation";

const Signin = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const token = useSelector((state) => state.user.token);

  const {
    handleSubmit,
    register,
    resetField,

    formState: { errors },
  } = useForm();

  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data) => {
      console.log("Sending data:", data);
      const params = new URLSearchParams();
      params.append("username", data.username);
      params.append("password", data.password);
      const res = await axios.post(
        "https://aucapi-staging.villaextech.com/auth/login",
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );
      if (res) console.log(res);

      return res.data;
    },
    onSuccess: (data) => {
      dispatch(
        loginUser({
          user: null,
          token: data.access_token,
          isAuthenticated: true,
        }),
      );
      router.push("/dashboard/dashboard");
    },
    onError: (error) => {
      console.log("FULL ERROR", error);
      console.log("Backend Error", error.response?.data);
    },
  });

  const Submithandle = async (data) => {
    loginMutation.mutate(data);
  };

  return (
    <section className="absolute left-90 flex justify-center items-center">
      <form
        onSubmit={handleSubmit(Submithandle)}
        action=""
        className="flex flex-col items-center justify-center gap-6 mt-5 border-2 border-amber-50 shadow-2xl rounded-2xl w-lg h-[70vh]"
      >
        <h1 className="text-start font-bold text-2xl">Sign In</h1>
        <p className="text-[15px]">
          Enter your credentials to access your account
        </p>

        <input
          placeholder="Enter Your username"
          type="text"
          {...register("username", { required: true })}
          className="w-sm p-3 rounded-2xl outline-1 shadow-2xl outline-gray-200"
        />
        <input
          placeholder="Enter Your Pass"
          type="text"
          {...register("password", { required: true })}
          className="w-sm p-3 rounded-2xl outline-1 shadow-2xl outline-gray-200"
        />

        <button
          type="submit"
          className="pl-5 pr-5 p-3 bg-blue-500 rounded-2xl shadow-lg"
        >
          Login
        </button>
      </form>
    </section>
  );
};

export default Signin;
