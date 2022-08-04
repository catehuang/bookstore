import { axios } from "../axios";
import { newCart, setCart } from "../reducers/cartSlice";

export const CreateCart = async (dispatch, user) => {
  try {
    const token = user.accessToken;
    const userId = user._id;
    const axiosAuth = axios.create({
      headers: { token: `Bearer ${token}` },
    });
    const response = await axiosAuth.post(`carts/new/${userId}`, {
        userId: userId
    });

    dispatch(newCart(response.data.userId));
    console.log("cart created.");
  } catch (error) {
    console.log(error);
  }
};

export const LoadCart = async (dispatch, user) => {
  try {
    //console.log(user);
    const token = user.accessToken;
    const userId = user._id;

    const axiosAuth = axios.create({
      headers: { token: `Bearer ${token}` },
    });
    //console.log("userId: " + userId);
    const response = await axiosAuth.get(`/carts/find/${userId}`);
    //console.log(response.data);
    if (response.data === null) {
      CreateCart(dispatch, user);
    } else {
      dispatch(setCart(response.data));
      //console.log(response.data);
      console.log("cart loaded.");
    }
  } catch (error) {
    console.log(error);
  }
};

export const UpdateCart = async (cart) => {
  try {
    const axiosAuth = axios.create({
      headers: { token: `Bearer ${cart.token}` },
    });
    const response = await axiosAuth.put(`/carts/${cart.cart._id}`, cart.cart);
    if (response.data === null) {
      console.log("Failed to update cart on server side.");
    } else {
      //console.log(response.data);
      console.log("updated cart on server side.");
    }
  } catch (error) {
    console.log(error);
  }
};
