import { axios } from "../axios";
import { setOrder } from "../reducers/orderSlice";

export const LoadOrders = async (dispatch, user) => {
        try {
                const token = user.accessToken;
                const userId = user.id;

                const axiosAuth = axios.create({
                        headers: { "x-access-token": `${token}` },
                });

                const response = await axiosAuth.get(`/orders/find/${userId}`);
                //console.log(response.data);
                dispatch(setOrder(response.data));
                //console.log("orders loaded.");
        } catch (err) {
                //console.log("No order history");
                //console.log(err);
        }
};
