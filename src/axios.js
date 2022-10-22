import axiosLib from "axios";

const BASE_URL = "http://localhost:5000/api";
// const BASE_URL = "https://web-app-bookstore.herokuapp.com/api";
const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;


export const axios = axiosLib.create({
  baseURL: BASE_URL,
});

export const axiosAuth = axiosLib.create({
  baseURL: BASE_URL,
  headers: { "x-access-token": `${TOKEN}` },
});
