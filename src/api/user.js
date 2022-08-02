import { axios }  from "../axios";
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
                CreateCart(dispatch, user);
                console.log("Registered. Welcome " + response.data.username + " !");
                // console.log(response.data);
        } catch (err) {
                console.log(err);
                if (err.response.data.err.name === "UserExistsError")
                        dispatch(registerFailure(2));
                else if (err.response.data.err.code === 11000) dispatch(registerFailure(3));
                else dispatch(registerFailure());
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
                console.log("Logout successfully. See you soon!")
        } catch (err) {
                console.log(err);
        }
};
