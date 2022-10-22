import { axiosAuth } from "../axios";
import { setOrder } from "../reducers/orderSlice";

export const LoadOrders = async (dispatch, user) => {
        try {
                const userId = user.id;
                const response = await axiosAuth.get(`/orders/find/${userId}`);
                //console.log(response.data);
                dispatch(setOrder(response.data));
                //console.log("orders loaded.");
        } catch (err) {
                //console.log("No order history");
                //console.log(err);
        }
};
