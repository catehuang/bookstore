import axios from "../axios";
import { useContext } from 'react';
//import AuthContext from '../context/AuthProvider';
import { loginStart, loginSuccess, loginFailure, registerSuccess, registerFailure  } from "../reducers/userSlice";

export const UserRegister = async (dispatch, user) => {
        try {
                const response = await axios.post("/register", user,
                        {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true
                    });
                console.log(response?.accessToken);
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
        //const { setAuth } = useContext(AuthContext);
        dispatch(loginStart());
        try {
                const response = await axios.post("/login", user,
                {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true
                    });
                    const accessToken = response?.data?.accessToken;
                   // setAuth({ user, accessToken });
                console.log(accessToken);
                dispatch(loginSuccess(response.data));
                console.log(response.data);
        } catch (err) {
                // if (!err?.originalStatus) {
                //         // isLoading: true until timeout occurs
                //         setErrMsg('No Server Response');
                //     } else if (err.originalStatus === 400) {
                //         setErrMsg('Missing Username or Password');
                //     } else if (err.originalStatus === 401) {
                //         setErrMsg('Unauthorized');
                //     } else {
                //         setErrMsg('Login Failed');
                //     }
                dispatch(loginFailure());
        }
};