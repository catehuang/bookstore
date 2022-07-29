import axios from "../axios";
import { newCart, setCart } from "../reducers/cartSlice";

export const CreateCart = async (dispatch, userId) => {
        try {
                const response = await axios.post(`carts/new/${userId}`, {
                        userId: userId,
                });
                dispatch(newCart(response.data));
        } catch (error) {
                console.log(error);
        }
};

export const LoadCart = async (dispatch, userId) => {
        try {
                const response = await axios.get(`/carts/find/${userId}`);

                //console.log(response.data);
                //console.log(userId);
                //if user doen't have any cart, create a new cart
                if (response.data === null) {
                        CreateCart(dispatch, userId);
                        //console.log(userId);
                } else {
                        console.log(response.data.userId);
                        dispatch(setCart(response.data));
                }
        } catch (error) { }
};

export const UpdateCart = async (cart) => {
        try {
                const response = await axios.put(`/carts/${cart._id}`, {
                        body: cart,
                });
                console.log(response.data);
        } catch (error) { }
};
