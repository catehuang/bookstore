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

export const CreateABook = async (book) => {
  try {
    const response = await axiosAuth.post(`/books/new`, {
        book,
    });
    return response.data
  } catch (error) {
    console.log(error.message);
  }
}

export const UpdateABook = async (book) => {
  try {
    const response = await axiosAuth.put(`/books/${book._id}`, {
        book,
    });
    return response.data
  } catch (error) {
    console.log(error.message);
  }
}

export const DeleteABook = async (book) => {
  try {
    const response = await axiosAuth.delete(`/books/${book._id}`);
    return response.data
  } catch (error) {
    console.log(error.message);
  }
}