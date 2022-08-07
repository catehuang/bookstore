import axiosLib from "axios";
// const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
// const currentUser = user && JSON.parse(user).currentUser;
// const token = currentUser?.accessToken;

const BASE_URL = "https://web-app-bookstore.herokuapp.com/:5000/api";

export const axios = axiosLib.create({
  baseURL: BASE_URL,
});

// export const axiosAuth = axiosLib.create({
//   baseURL: BASE_URL,
//   headers: { token: `Bearer ${token}` },
// });