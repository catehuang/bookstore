import { axios, axiosAuth } from "../axios";

export const GetAllBooks = async () => {
  try {
    const response = await axios.get(`/books`)
    return response.data

  } catch (error) {
    console.log(error.message);
  }
};

export const GetABook = async (id) => {
  try {
    const response = await axios.get(`/books/find/${id}`);
    return response.data
  } catch (error) {
    console.log(error.message);
  }
};

export const CreateABook = async (book, user) => {
  try {
    const response = await axiosAuth.post(`/books/new`, {
        book,
        user
    });
    return response.data
  } catch (error) {
    console.log(error.message);
  }
}