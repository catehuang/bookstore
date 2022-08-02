import { axios } from "../axios";
import { newCart, setCart } from "../reducers/cartSlice";

export const CreateCart = async (dispatch, user) => {
        try {
                const token = user.accessToken;
                const userId = user._id;
                const axiosAuth = axios.create({
                        headers: { token: `Bearer ${token}` },
                });
                const response = await axiosAuth.post(`carts/new/${userId}`);
                dispatch(newCart(response.data._id));
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

                const response = await axiosAuth.get(`/carts/find/${userId}`);
                //console.log(response.data);
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

export const UpdateCart = async (cart) => {
        try {
                const axiosAuth = axios.create({
                        headers: { token: `Bearer ${cart.token}` },
                });
                const response = await axiosAuth.put(`/carts/${cart.cart._id}`, cart.cart);
               //console.log(response.data);
                //console.log("updated cart on server side.");
        } catch (error) { 
                console.log(error);
        }
};
