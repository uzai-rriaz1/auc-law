"use client";
export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  if (typeof window === "undefined") return;
  const token = localStorage.getItem("token");
  return token;
};
