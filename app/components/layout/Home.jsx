"use client";
import React from "react";
import Dashboard from "../../dashboard/dashboard/page";
import Signin from "../../auth/signin/page";
import AuthCheck from "../../authWrapper/authCheck";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
const HomePage = () => {
  const router = useRouter();
  const authorized = useSelector((state) => state.user.isAuthenticated);

  useEffect(() => {
    if (authorized) {
      router.replace("/dashboard/dashboard");
    } else {
      router.replace("/auth/signin");
    }
  }, [authorized]);

  return null;
};

export default HomePage;
