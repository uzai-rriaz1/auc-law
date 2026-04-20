"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const AuthCheck = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  });
  const isAuth = useSelector((state) => state.user.token);
  if (!mounted) return null;

  return <div>{isAuth ? <div>{children}</div> : null}</div>;
};

export default AuthCheck;
