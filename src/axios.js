import axiosLib from "axios";

// for development
const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://web-app-bookstore.herokuapp.com/api/"
    : "http://localhost:5000/api";

console.log(BASE_URL);

export const axios = axiosLib.create({
  baseURL: BASE_URL,
});
