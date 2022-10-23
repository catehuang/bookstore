import { axiosAuth } from "../axios";
import { addProduct, adoptCart, setCart } from "../reducers/cartSlice";


export const LoadCart = async (dispatch, user) => {
    try {
        const userId = user.id;
        const response = await axiosAuth.get(`/carts/find/${userId}`);

        if (response.data === null) {
            CreateCart(dispatch, user);
        } else {
            dispatch(adoptCart(response.data));
            response.data.products.map((product) => (
                dispatch(addProduct(product))
            ))
        }
    } catch (error) {
        console.log(error);
    }
};

export const CreateCart = async (dispatch, user) => {
    try {
        const userId = user.id;
        const response = await axiosAuth.post(`carts/new/${userId}`, {
            userId: userId
        });
        dispatch(setCart(response.data));
    } catch (error) {
        //console.log(error);
    }
};

export const UpdateCart = async (obj) => {
    const cart = obj.cart;

    try {
        await axiosAuth.put(`/carts/${cart.cartId}`, {
            body: cart
        });
    } catch (error) {
        //console.log(error);
    }
};
