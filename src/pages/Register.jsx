import React, { useState, useEffect } from "react";
import { publicRequest } from "../publicRequest";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { registerSuccess, registerFailure } from "../reducers/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Register() {
        const [email, setEmail] = useState("");
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
        const [passwordShown, setPsswordShown] = useState(false);
        const { registerError, registered } = useSelector((state) => state.user);
        const navigate = useNavigate();
        const dispatch = useDispatch();
        const [validEmail, setValidEmail] = useState(false);
        const [validUsername, setValidUsername] = useState(false);
        const [validPassword, setValidPassword] = useState(false);
        const [formValidated, setFormValidated] = useState(false);
        const [duplicateUser, setDuplicateUser] = useState(false);
        const [duplicateEmail, setDuplicateEmail] = useState(false);

        const validateEmail = (value) => {
                setEmail(value);
                if (value.match(/^[a-zA-Z-@.0-9]+$/)) setValidEmail(true);
                else setValidEmail(false);
        };

        const validateUsername = (value) => {
                setUsername(value);
                if (value.match(/^[a-zA-Z-@.0-9]+$/)) setValidUsername(true);
                else setValidUsername(false);
        };

        const validatePassword = (value) => {
                setPassword(value);
                if (value.match(/^[a-zA-Z-@.0-9]+$/)) setValidPassword(true);
                else setValidPassword(false);
        };

        useEffect(() => {
                const validateForm = () => {
                        if (
                                validEmail &&
                                validUsername &&
                                validPassword
                        )
                        {
                                setFormValidated(true);
                        }
                        else {
                                setFormValidated(false);
                        }       
                };
                validateForm();
        });

        const handleRegister = async (e) => {
                e.preventDefault();
                setDuplicateUser(false);
                setDuplicateEmail(false);

                if (formValidated) {
                        const register = async (dispatch, user) => {
                                try {
                                        const response = await publicRequest.post("/register", user);
                                        console.log(response);

                                        dispatch(registerSuccess(response.data));
                                        console.log("registered=" + registered + " ; registerError= " + registerError);
                                        if (response.status === 201) navigate("/");
                                } catch (error) {
                                        // username or email exists or other problems
                                        dispatch(registerFailure());
                                        if (error.response.data.message)
                                                setDuplicateUser(true);
                                        else if (error.response.data.code === 11000)
                                                setDuplicateEmail(true);
                                        console.log("Registered error: " + error);
                                }
                        };
                        register(dispatch, {
                                email,
                                username,
                                password,
                                //isAdmin: false
                        });
                }
        };

        const togglePassword = (e) => {
                e.preventDefault();
                setPsswordShown(!passwordShown);
        };

        return (
                <div>
                        <div className="h-16">
                                {
                                        (!validUsername || !validEmail || !validPassword) &&
                                        <div className="py-2 text-center bg-green-600 text-gray-50">
                                                <p className="text-sm">Available characters include letters, numbers, at sign(@), dot(.), and hyphen(-).</p>
                                        </div>
                                }
                                {
                                        duplicateUser &&
                                        <div className="text-red-600 text-center bg-red-100 py-1">This username exists. Please choose another one.</div>
                                }
                                {
                                        duplicateEmail &&
                                        <div className="text-red-600 text-center bg-red-100 py-1">This Email already registered.</div>
                                }
                                {
                                        registerError && !duplicateUser && !duplicateEmail &&
                                        <div><p className="text-red-600 text-center bg-red-100 py-1">Register failed. Please try again.</p></div>
                                }
                        </div>
                <div className="mx-auto w-96">
                        <p className="text-3xl first-letter:font-bold text-center">BookStore</p>
                        <form className="border rounded-lg my-5 p-5 flex flex-col gap-5">
                                <p className="text-xl">Sign Up</p>

                                <div className="felx flex-col">
                                        <p className="pb-1">E-mail address</p>
                                        <div className="flex border rounded-lg w-full justify-between">
                                                <input
                                                        type="text"
                                                        value={email}
                                                        required
                                                        onChange={(e) => validateEmail(e.target.value)}
                                                        className=" py-1 px-2 w-full"
                                                />
                                                {validEmail && (
                                                        <p className="text-green-600 font-bold p-1">&#10003;</p>
                                                )}
                                        </div>
                                </div>

                                <div className="felx flex-col">
                                        <p className="pb-1">Username</p>
                                        <div className="flex border rounded-lg w-full justify-between">
                                                <input
                                                        type="text"
                                                        value={username}
                                                        required
                                                        onChange={(e) => validateUsername(e.target.value)}
                                                        className="py-1 px-2 w-full"
                                                />
                                                {validUsername && (
                                                        <p className="text-green-600 font-bold p-1">&#10003;</p>
                                                )}
                                        </div>
                                </div>

                                <div className="felx flex-col">
                                        <p className="pb-1">Password</p>
                                        <div className="flex border rounded-lg w-full justify-between">
                                                <input
                                                        type={passwordShown ? "text" : "password"}
                                                        value={password}
                                                        required
                                                        onChange={(e) => validatePassword(e.target.value)}
                                                        className="py-1 px-2 w-full"
                                                />
                                                <button onClick={togglePassword}>
                                                        {passwordShown ? (
                                                                <VisibilityIcon color="action" />
                                                        ) : (
                                                                <VisibilityOffIcon color="action" />
                                                        )}
                                                </button>
                                        </div>
                                </div>

                                {
                                        formValidated?
                                        (
                                                <button
                                                        type="submit"
                                                        className="border rounded-lg p-1 bg-amber-300 hover:bg-amber-400"
                                                        onClick={handleRegister}>
                                                        Register
                                                </button>
                                        )
                                        :  
                                        (
                                                <button className="border rounded-lg p-1 bg-gray-200" disabled>Register</button>
                                        )
                                }

                                <p className="text-xs">
                                        By continuing, you agree to BookStore Conditions of Use and Privacy
                                        Notice.
                                </p>
                        </form>
                </div>
                </div>
        );
}

export default Register;
