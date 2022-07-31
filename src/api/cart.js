import { axiosAuth } from '../axios';
import { newCart, setCart } from "../reducers/cartSlice";



export const CreateCart = async (dispatch, userId) => {
        try {
                const response = await axiosAuth.post(`carts/new/${userId}`, {
                        userId: userId,
                });
                dispatch(newCart(response.data));
        } catch (error) {
                console.log(error);
        }
};

export const LoadCart = async (dispatch, user) => {
        try {
                console.log({user});
                // const token = user.token;
                // const userId = user.id;
                // //console.log(user);
                // const response = await axioAuth(`${token}`).get(`/carts/find/${userId}`);
                // console.log("load cart");
                // dispatch(setCart(response.data));
        } catch (error) {
                console.log(error);
                // try {
                //         CreateCart(dispatch, userId);
                //         console.log("create cart");
                // }
                // catch(err)
                // {
                //         console.log(err);
                // }
         }
};

export const UpdateCart = async (cart) => {
        try {
                const response = await axiosAuth.put(`/carts/${cart._id}`, {
                        body: cart,
                });
                console.log(response.data);
        } catch (error) { }
};
