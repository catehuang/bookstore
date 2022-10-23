import { axiosAuth } from "../axios";
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
        const response = await axiosAuth.post("/register", user);
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
        const response = await axiosAuth.post("/login", user);

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

export const GetAllUsers = async () => {
    const response = await axiosAuth.get("/users")
    return response.data
 };

 export const UpdateRole = async (user, role) => {
    const response = await axiosAuth.put(`/users/${user._id}`, {
        role_name: role
    })

    return response.data
 }