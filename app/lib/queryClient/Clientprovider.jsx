"use client";
import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const Clientprovider = ({ children }) => {
  const client = new QueryClient();
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

export default Clientprovider;
