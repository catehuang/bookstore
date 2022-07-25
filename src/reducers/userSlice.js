import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    loginError: false,
    registerError: false,
    registered: false,
    registerErrorCode: 1
  },
  reducers: {
    registerSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.registered = true;
    },
    registerFailure: (state, action) => {
      state.registerError = true;
      state.registerErrorCode = action.payload;
    },
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.loginError = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isFetching = false;
      state.loginError = false;
      state.registered = false;
      state.registerError = false;
    },
  },
});

export const {
  registerSuccess,
  registerFailure,
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
} = userSlice.actions;
export default userSlice.reducer;
