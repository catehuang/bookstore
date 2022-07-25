import React, { useState, useEffect } from "react";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserRegister } from "../controllers/user";

function Register() {
        const [email, setEmail] = useState("");
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
        const [passwordShown, setPsswordShown] = useState(false);
        const { registerError, loginError, registerErrorCode } = useSelector(
                (state) => state.user
        );
        const navigate = useNavigate();
        const dispatch = useDispatch();
        const [validEmail, setValidEmail] = useState(false);
        const [validUsername, setValidUsername] = useState(false);
        const [validPassword, setValidPassword] = useState(false);
        const [formValidated, setFormValidated] = useState(false);

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
                        if (validEmail && validUsername && validPassword) {
                                setFormValidated(true);
                        } else {
                                setFormValidated(false);
                        }
                };
                validateForm();
        });

        const handleRegister = async (e) => {
                e.preventDefault();

                if (formValidated) {
                        UserRegister(dispatch, {
                                email,
                                username,
                                password,
                        });
                        if (!loginError && !registerError)
                                navigate('/');
                }
        };

        const togglePassword = (e) => {
                e.preventDefault();
                setPsswordShown(!passwordShown);
        };

        return (
                <div>
                        <div className="h-16">
                                {(!validUsername || !validEmail || !validPassword) && (
                                        <div className="py-2 text-center bg-green-600 text-gray-50">
                                                <p className="text-sm">
                                                        Available characters include letters, numbers, at sign(@), dot(.),
                                                        and hyphen(-).
                                                </p>
                                        </div>
                                )}
                                { registerError && registerErrorCode===2 && (
                                        <div className="text-red-600 text-center bg-red-100 py-1">
                                                This username exists. Please choose another one.
                                        </div>
                                )}
                                { registerError && registerErrorCode === 3 && (
                                        <div className="text-red-600 text-center bg-red-100 py-1">
                                                This Email already registered.
                                        </div>
                                )}
                                { registerError && registerErrorCode === 1 && (
                                        <div>
                                                <p className="text-red-600 text-center bg-red-100 py-1">
                                                        Register failed. Please try again.
                                                </p>
                                        </div>
                                )}
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

                                        {formValidated ? (
                                                <button
                                                        type="submit"
                                                        className="border rounded-lg p-1 bg-amber-300 hover:bg-amber-400"
                                                        onClick={handleRegister}
                                                >
                                                        Register
                                                </button>
                                        ) : (
                                                <button className="border rounded-lg p-1 bg-gray-200" disabled>
                                                        Register
                                                </button>
                                        )}

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
