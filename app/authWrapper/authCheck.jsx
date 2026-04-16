"use client";
import React from "react";
import { useSelector } from "react-redux";

const AuthCheck = ({ children }) => {
  const isAuth = useSelector((state) => state.user.isAuthenticated);

  return <div>{isAuth ? <div>{children}</div> : null}</div>;
};

export default AuthCheck;
