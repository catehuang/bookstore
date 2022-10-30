import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from "@mui/icons-material/Visibility";
import { UserLogin } from "../api/user";

function Login() {
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
        const [passwordShown, setPasswordShown] = useState(false);

        const [formValidated, setFormValidated] = useState(false);
        const { loginError } = useSelector((state) => state.user);
        const [message, setMessage] = useState("")
        const dispatch = useDispatch();

        useEffect(() => {
                const validateForm = () => {
                        if (username.length > 0 && password.length > 4) {
                                setFormValidated(true);
                        } else {
                                setFormValidated(false);
                        }
                };
                validateForm();
        });

        useEffect (() => {
                setMessage("")
        },[username, password])

        const togglePassword = (e) => {
                e.preventDefault();
                setPasswordShown(!passwordShown);
        };

        const handleLogin = async (e) => {
                e.preventDefault();

                try {
                        UserLogin(dispatch, {
                                username,
                                password,
                        });
                        setMessage(loginError)
                } catch (err) {
                        console.log(err);
                }
        };

        return (
                <div className="flex flex-col">
                        <div className="py-5">
                                {message && (
                                        <div className="text-sm text-red-500 text-center font-bold w-fit mx-auto">
                                                <p className="bg-red-50 px-5 py-3">Username or password incorrect. Please try again.</p>
                                        </div>
                                )}
                        </div>
                        <div className="mx-auto w-4/5 sm:w-96 mt-5">
                                <p className="text-3xl first-letter:font-bold text-center">BookStore</p>
                                <form className="sm:border rounded-lg my-5 p-5 flex flex-col space-y-5">
                                        <p className="text-xl">Login</p>

                                        <div className="flex flex-col">
                                                <p className="pb-1">Username</p>
                                                <input
                                                        type="text"
                                                        value={username}
                                                        onChange={(e) =>
                                                                setUsername(e.target.value.replace(/[^0-9-_.a-z@]/gi, ""))
                                                        }
                                                        className="border rounded py-1 px-2 w-full"
                                                />
                                        </div>

                                        <div className="flex flex-col">
                                                <p className="pb-1">Password</p>
                                                <div className="flex border rounded-lg w-full justify-between">
                                                        <input
                                                                type={passwordShown ? "text" : "password"}
                                                                value={password}
                                                                required
                                                                onChange={(e) =>
                                                                        setPassword(e.target.value.replace(/[^0-9-_.a-z@]/gi, ""))
                                                                }
                                                                className="py-1 px-2 w-full"
                                                        />
                                                        <button onClick={togglePassword} className="pr-1">
                                                                {passwordShown ? (
                                                                        <VisibilityIcon color="action" fontSize="small" />
                                                                ) : (
                                                                        <VisibilityOffIcon color="action" fontSize="small" />
                                                                )}
                                                        </button>
                                                </div>
                                        </div>

                                        {formValidated ? (
                                                <button
                                                        type="submit"
                                                        className="border rounded-lg p-1 bg-amber-300 hover:bg-amber-400 my-5"
                                                        onClick={handleLogin}
                                                >
                                                        Login
                                                </button>
                                        ) : (
                                                <button className="border rounded-lg p-1 bg-gray-200 my-5" disabled>
                                                        Login
                                                </button>
                                        )}
                                        <p className="text-xs">
                                                By continuing, you agree to BookStore Conditions of Use and Privacy
                                                Notice.
                                        </p>
                                        <Link to="/register">
                                                <p className="text-cyan-600 text-sm">New to BookStore?</p>
                                        </Link>
                                </form>
                        </div>
                </div>
        );
}

export default Login;
