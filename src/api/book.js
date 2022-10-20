import { axios } from "../axios";

export const getAllBooks = async () => {
  try {
    const response = await axios.get(`/books`)
    return response.data
    
  } catch (error) {
    console.log(error.message);
  }
};

export const getABook = async (id) => {
    try {
        const response = await axios.get(`/books/find/${id}`);
        return response.data
    } catch (error) {
        console.log(error.message);
    }
};