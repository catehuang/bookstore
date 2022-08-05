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

    console.log("create cart:")
    console.log(response.data)

    dispatch(newCart(response.data));
    console.log("cart created.");
  } catch (error) {
    console.log(error);
  }
};

export const LoadCart = async (dispatch, user) => {
  try {
    const token = user.accessToken;
    const userId = user._id;

    const axiosAuth = axios.create({
      headers: { token: `Bearer ${token}` },
    });
    const response = await axiosAuth.get(`/carts/find/${userId}`);

    console.log("load cart:")
    console.log(response.data);

    if (response.data === null) {
      CreateCart(dispatch, user);
    } else {
      dispatch(setCart(response.data));
      console.log("cart loaded.");
    }
  } catch (error) {
    console.log(error);
  }
};

export const UpdateCart = async (obj) => {
  // passed parameters are cart and user
  const token = obj.user.accessToken;
  const cart = obj.cart;
  console.log(cart);

  try {
    const axiosAuth = axios.create({
      headers: { token: `Bearer ${token}` },
    });

    const response = await axiosAuth.put(`/carts/${cart.cartId}`, {
      body: cart
    });
    //console.log(response.data);
    
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
