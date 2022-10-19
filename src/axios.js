import axiosLib from "axios";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://web-app-bookstore.herokuapp.com/api"
    : "http://localhost:5000/api";

export const axios = axiosLib.create({
  baseURL: BASE_URL,
});
