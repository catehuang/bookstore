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
        const response = await axios.post("/register", user, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
        });

        if (response.data.success === false) {
                if (response.data.err.name === "UserExistsError")
                        dispatch(registerFailure(2)); // user exists
                else if (response.data.err.code === 11000)
                        dispatch(registerFailure(3)); // email exists
                else dispatch(registerFailure()); // other errors
        }
        else
        {       
                dispatch(registerSuccess(response.data));
                dispatch(loginSuccess(response.data));
                CreateCart(dispatch, response.data);
                console.log("Registered. Welcome " + response.data.username + " !");
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
                console.log("Login successfully. Welcome " + response.data.username + " !");
                LoadCart(dispatch, response.data);
                LoadOrders(dispatch, response.data);
        } catch (err) {
                console.log(err);
                dispatch(loginFailure());
        }
};

export const UserLogout = async () => {
        try {
                await axios.get("/logout");
                console.log("Logout successfully. See you soon!");
        } catch (err) {
                console.log(err);
        }
};
