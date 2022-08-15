import axiosLib from "axios";

// for development
//const BASE_URL = "http://localhost:5000/api";

// for deployment
const BASE_URL = "https://web-app-bookstore.herokuapp.com/api";

export const axios = axiosLib.create({
  baseURL: BASE_URL,
});
