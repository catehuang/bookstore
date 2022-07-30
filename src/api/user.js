import axios from "../axios";

import {
        loginStart,
        loginSuccess,
        loginFailure,
        registerSuccess,
        registerFailure,
        logout,
} from "../reducers/userSlice";

export const UserRegister = async (dispatch, user) => {
        try {
                const response = await axios.post("/register", user, {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: true,
                });
                //console.log("registered");
                dispatch(registerSuccess(response.data));
                dispatch(loginSuccess(response.data));
                //console.log(response);
        } catch (err) {
                //console.log("UserRegister failed");
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
                console.log(response.data);
               // console.log(response.data);
        } catch (err) {
                console.log(err);
                dispatch(loginFailure());
        }
};

export const UserLogout = async (dispatch, user) => {
        try {
                const response = await axios.get("/logout", user, {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: true,
                });
        } catch (err) {
                console.log(err);
        }
};
