import { axios } from "../axios";
import { addProduct, adoptCart, setCart } from "../reducers/cartSlice";


export const LoadCart = async (dispatch, user) => {
    try {
        const token = user.accessToken;
        const userId = user._id;

        const axiosAuth = axios.create({
            headers: { token: `Bearer ${token}` },
        });
        const response = await axiosAuth.get(`/carts/find/${userId}`);
        //console.log("load cart =============");
        //console.log(response.data);

        if (response.data === null) {
            CreateCart(dispatch, user);
        } else {
            // update the anonynous cart 
            dispatch(adoptCart(response.data));
            // put those product from remote cart to local cart
            response.data.products.map((product) => (
                dispatch(addProduct(product))
            ))
            //console.log("cart loaded.");
        }
    } catch (error) {
        console.log(error);
    }
};

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
        // only need to change the name tag on the local cart
        dispatch(setCart(response.data));
        //console.log("cart created.");
    } catch (error) {
        //console.log(error);
    }
};

export const UpdateCart = async (obj) => {
    // passed parameters are cart and user
    const token = obj.user.accessToken;
    const cart = obj.cart;

    try {
        const axiosAuth = axios.create({
            headers: { token: `Bearer ${token}` },
        });

        const response = await axiosAuth.put(`/carts/${cart.cartId}`, {
            body: cart
        });

        //console.log("update cart to server side.");
    } catch (error) {
        //console.log(error);
    }
};
