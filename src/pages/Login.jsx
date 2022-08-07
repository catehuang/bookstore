import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { UserLogin } from "../api/user";

function Login() {
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
        const [passwordShown, setPsswordShown] = useState(false);

        const [formValidated, setFormValidated] = useState(false);
        const { loginError } = useSelector((state) => state.user);
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

        const togglePassword = (e) => {
                e.preventDefault();
                setPsswordShown(!passwordShown);
        };

        const handleLogin = async (e) => {
                e.preventDefault();

                try {
                        UserLogin(dispatch, {
                                username,
                                password,
                        });
                } catch (err) {
                        console.log(err);
                }
        };

        return (
                <div className="h-screen">
                        <div className="h-16">
                                {loginError && (
                                        <div className="text-red-600 text-center bg-red-100 py-1">
                                                Username or password incorrect. Please try again.
                                        </div>
                                )}
                        </div>
                        <div className="mx-auto w-96">
                                <p className="text-3xl first-letter:font-bold text-center">BookStore</p>
                                <form className="border rounded-lg my-10 p-5 flex flex-col gap-5">
                                        <p className="text-xl">Login</p>

                                        <div className="felx flex-col">
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

                                        <div className="felx flex-col">
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
                                                        className="border rounded-lg p-1 bg-amber-300 hover:bg-amber-400"
                                                        onClick={handleLogin}
                                                >
                                                        Login
                                                </button>
                                        ) : (
                                                <button className="border rounded-lg p-1 bg-gray-200" disabled>
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
