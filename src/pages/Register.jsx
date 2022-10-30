import React, { useState, useEffect } from "react";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useDispatch, useSelector } from "react-redux";
import { UserRegister } from "../api/user";

function Register() {
        const [email, setEmail] = useState("");
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
        const [passwordShown, setPasswordShown] = useState(false);
        const { registerError, registerErrorCode } = useSelector(
                (state) => state.user
        );
        const dispatch = useDispatch();
        const [formValidated, setFormValidated] = useState(false);

        useEffect(() => {
                const validateForm = () => {
                        if (
                                email.length > 5 &&
                                email.includes("@") &&
                                username.length > 0 &&
                                password.length > 4
                        ) {
                                setFormValidated(true);
                        } else {
                                setFormValidated(false);
                        }
                };
                validateForm();
        });

        const handleRegister = async (e) => {
                e.preventDefault();

                try {
                        UserRegister(dispatch, {
                                email,
                                username,
                                password,
                        });
                } catch (err) {
                        console.log("Failed to register");
                }
        };

        const togglePassword = (e) => {
                e.preventDefault();
                setPasswordShown(!passwordShown);
        };

        return (
                <div className="flex flex-col">
                        <div className="text-sm text-center font-bold w-fit mx-auto text-red-600">
                                {!formValidated && (
                                        <div className="">
                                                <p className="text-green-600 bg-green-50 px-5 py-3">
                                                        Available characters include letters, numbers, at sign(@), dot(.),
                                                        and hyphen(-). Password must contain at least five characters.
                                                </p>
                                        </div>
                                )}
                                {registerError && registerErrorCode === 2 && (
                                        <div className="bg-red-50 px-5 py-3">
                                                This username exists. Please choose another one.
                                        </div>
                                )}
                                {registerError && registerErrorCode === 3 && (
                                        <div className="bg-red-50 px-5 py-3">
                                                This Email already registered.
                                        </div>
                                )}
                                {registerError && registerErrorCode === 1 && (
                                        <div>
                                                <p className="bg-red-50 px-5 py-3">
                                                        Register failed. Please try again.
                                                </p>
                                        </div>
                                )}
                        </div>
                        <div className="mx-auto w-4/5 sm:w-96 mt-11">
                                <p className="text-3xl first-letter:font-bold text-center">BookStore</p>
                                <form className="sm:border rounded-lg mt-5 mb-1 p-5 flex flex-col space-y-5">
                                        <p className="text-xl">Sign Up</p>

                                        <div className="flex flex-col">
                                                <p className="pb-1">E-mail address</p>
                                                <div className="flex border rounded-lg w-full justify-between">
                                                        <input
                                                                type="text"
                                                                value={email}
                                                                required
                                                                onChange={(e) =>
                                                                        setEmail(e.target.value.replace(/[^0-9-_.a-z@]/gi, ""))
                                                                }
                                                                className=" py-1 px-2 w-full"
                                                        />
                                                </div>
                                        </div>

                                        <div className="flex flex-col">
                                                <p className="pb-1">Username</p>
                                                <div className="flex border rounded-lg w-full justify-between">
                                                        <input
                                                                type="text"
                                                                value={username}
                                                                required
                                                                onChange={(e) =>
                                                                        setUsername(e.target.value.replace(/[^0-9-_.a-z@]/gi, ""))
                                                                }
                                                                className="py-1 px-2 w-full"
                                                        />
                                                </div>
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
                                                        <button onClick={togglePassword}>
                                                                {passwordShown ? (
                                                                        <VisibilityIcon
                                                                                color="action"
                                                                                fontSize="small"
                                                                                className="pr-1"
                                                                        />
                                                                ) : (
                                                                        <VisibilityOffIcon
                                                                                color="action"
                                                                                fontSize="small"
                                                                                className="pr-1"
                                                                        />
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
