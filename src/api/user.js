import { axios } from "../axios";
import { LoadOrders } from "./order";
import { LoadCart, CreateCart } from "./cart";
import {
        loginStart,
        loginSuccess,
        loginFailure,
        registerSuccess,
        registerFailure,
} from "../reducers/userSlice";

export const UserRegister = async (dispatch, user) => {
        try {
                const response = await axios.post("/register", user, {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: true,
                });                
                dispatch(registerSuccess(response.data));
                dispatch(loginSuccess(response.data));
                CreateCart(dispatch, response.data);              
        } catch (err) {
                if (err.response.data.message === "Failed! Username is already in use!")
                        dispatch(registerFailure(2)); // user exists
                else if (err.response.data.message === "Failed! Email is already in use!")
                        dispatch(registerFailure(3)); // email exists
                else dispatch(registerFailure()); // other errors
        }
};

export const UserLogin = async (dispatch, user) => {
        dispatch(loginStart());
        try {
                const response = await axios.post("/login", user, {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: true,
                });

                dispatch(loginSuccess(response.data));
                // console.log(response.data);
                //console.log("Login successfully. Welcome " + response.data.username + " !");
                LoadCart(dispatch, response.data);
                LoadOrders(dispatch, response.data);
        } catch (err) {
                //console.log(err);
                dispatch(loginFailure());
        }
};

export const UserLogout = async () => {
        try {
                await axios.get("/logout");
                //console.log("Logout successfully. See you soon!");
        } catch (err) {
                //console.log(err);
        }
};
