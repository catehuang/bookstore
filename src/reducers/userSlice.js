import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialSate: {
    currentUser: null,
    isFeteching: false,
    loginError: false,
    registerError: false,
    registered: false,
  },
  reducers: {
    registerSuccess: (state) => {
      state.registered= true;
    },
    registerFailure: (state) => {
      state.isFeteching = false;
      state.registerError = true;
    },
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) =>{
        state.isFetching = false;
        state.currentUser = action.payload;
      },
    loginFailure: (state) => {
      state.isFeteching = false;
      state.loginError = true;
    },
    logout:(state) => {
        state.currentUser = null;
        state.registered = false;
        state.loginError = false;
        state.registerError = false;
      },
  },
});

export const { registerSuccess, registerFailure, loginStart, loginSuccess, loginFailure, logout } =
  userSlice.actions;
export default userSlice.reducer;
