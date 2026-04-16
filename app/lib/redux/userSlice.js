import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "User",
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
  },
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logoutUser: (state, action) => {},
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
