"use client";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import { Provider } from "react-redux";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

const storeProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
export default storeProvider;
