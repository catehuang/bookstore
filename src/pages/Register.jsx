import React, { useState } from "react";
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

  const handleRegister = async (e) => {
    e.preventDefault();
    const register = async (dispatch, user) => {
      try {
        const response = await publicRequest.post("/register", user);
        console.log(response);
        dispatch(registerSuccess(response.data));
        if (registered) navigate("/");
      } catch (error) {
        dispatch(registerFailure());
      }
    };

    register(dispatch, {
      email,
      username,
      password,
    });
  };

  const togglePassword = (e) => {
    e.preventDefault();
    setPsswordShown(!passwordShown);
  };

  return (
    <div className="mx-auto my-10 w-96">
      <p className="text-3xl first-letter:font-bold text-center">BookStore</p>
      <form className="border rounded-lg my-5 p-5 flex flex-col gap-5">
        <p className="text-xl">Sign Up</p>

        <div className="felx flex-col">
          <p className="pb-1">E-mail address</p>
          <input
            type="text"
            value={email}
            pattern="^\w+(\.@\w+)?$"
            required
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-lg py-1 px-2 w-full"
          />
        </div>

        <div className="felx flex-col">
          <p className="pb-1">Username</p>
          <input
            type="text"
            value={username}
            pattern="^\w+(\.@\w+)?$"
            required
            onChange={(e) => setUsername(e.target.value)}
            className="border rounded-lg py-1 px-2 w-full"
          />
        </div>

        <div className="felx flex-col">
          <p className="pb-1">Password</p>
          <div className="flex border rounded-lg w-full justify-between">
            <input
              type={passwordShown ? "text" : "password"}
              value={password}
              pattern="^\w+(\.@\w+)?$"
              required
              onChange={(e) => setPassword(e.target.value)}
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

        <button
          type="submit"
          className="border rounded-lg p-1 bg-amber-300 hover:bg-amber-400 hover:font-bold"
          onClick={handleRegister}
        >
          Register
        </button>
        <p className="text-xs">
          By continuing, you agree to BookStore Conditions of Use and Privacy
          Notice.
        </p>
      </form>
      {registerError && (
        <div className="text-red-500">Register Failed. Please try again.</div>
      )}
    </div>
  );
}

export default Register;
