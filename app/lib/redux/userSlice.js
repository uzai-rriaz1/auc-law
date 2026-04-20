import { createSlice } from "@reduxjs/toolkit";
import { setToken, getToken } from "../localstorage/Localstorage";
const userSlice = createSlice({
  name: "User",
  initialState: {
    user: null,
    token: getToken() || null,
    isAuthenticated: false,
  },
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      setToken(action.payload.token);
    },
    logoutUser: (state, action) => {},
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
