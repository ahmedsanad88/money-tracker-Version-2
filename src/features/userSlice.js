//jshint esversion:6
// using redux toolkit to handle our app state.
import { createSlice } from "@reduxjs/toolkit";

// create initial state.
const initialState = {
  user: {
    id: "",
    email: "",
    photo: "",
    fullname: "",
    mobile: "",
    gender: "",
    country: "",
    totalEarn: 0,
    totalSpend: 0,
  },
};

// handle reducer and action to update user state.
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
