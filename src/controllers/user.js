import { publicRequest } from "../publicRequest";
import { loginStart, loginSuccess, loginFailure, registerSuccess, registerFailure  } from "../reducers/userSlice";

export const UserRegister = async (dispatch, user) => {
        try {
                const response = await publicRequest.post("/register", user);
                //console.log(response);
                dispatch(registerSuccess(response.data));
        } catch (error) {
                // username or email exists or other problems
                 console.log(error);
                 //console.log(error.response.data.err.index);
                if (error.response.data.err.name === "UserExistsError")
                        dispatch(registerFailure(2));
                else if (error.response.data.err.code === 11000)
                        dispatch(registerFailure(3));
                else
                        dispatch(registerFailure());
                //console.log("Registered error: " + error);
        }
        UserLogin(dispatch, user);
};

export const UserLogin = async (dispatch, user) => {
        dispatch(loginStart());
        try {
                const response = await publicRequest.post("/login", user);
                //console.log(response);
                dispatch(loginSuccess(response.data));
                //console.log(response.data);
        } catch (error) {
                dispatch(loginFailure());
                //console.log(error);
        }
};