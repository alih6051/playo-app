import { createSlice } from "@reduxjs/toolkit";

const user = JSON.parse(sessionStorage.getItem("jwt_playo"));

const initialState = {
  user: user || null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, { type, payload }) => {
      state.user = payload;
    },
    logoutUser: (state) => {
      state.user = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
