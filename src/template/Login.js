// @ts-nocheck
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signIn = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        const user = userCredential.user;

        if (auth) {
          navigate("/");
        }
      })
      .catch((error) => alert(error.message));
  };

  const register = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // it successfully created a new user with email and password
        console.log(userCredential);
        const user = userCredential.user;

        if (auth) {
          navigate("/");
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="mx-auto">
      <div className="my-5 flex justify-center">
          <Link to="/">
          <img
            className="w-48"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/175px-Amazon_logo.svg.png"
          />
           </Link>
        </div>
     
      <form>
        <div className="my-5 mx-auto border border-gray-600 rounded-lg py-5 px-8 w-96">
          <p className="text-2xl font-bold mb-3">Sign-In</p>
          <p>E-mail address</p>
          <input
            type="text"
            value={email}
            className="my-2 border border-gray-500 rounded w-full py-1 px-2"
            onChange={(e) => setEmail(e.target.value)}
          />

          <p className="mt-2">Password</p>
          <input
            type="password"
            value={password}
            className="my-2 border border-gray-500 rounded w-full py-1 px-2"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="mt-5 text-center border border-yellow-500 bg-amber-200 w-full py-2 rounded hover:bg-amber-300"
            onClick={signIn}
          >
            Login
          </button>

          <p className="text-sm mt-2 mb-5">
            By continuing, you agree to Amazon FAKE CLONE's Conditions of Use
            and Privacy Notice.
          </p>
          <p className="text-sm text-cyan-700">Need help?</p>
        </div>
      </form>
      <div className="w-96 mx-auto text-center mb-5">
        <p className="">
          <span>New to Amazon FAKE CLONE ?</span>
        </p>
        <button
          className="mt-5 text-center border border-yellow-500 bg-amber-200 w-full py-2 rounded hover:bg-amber-300"
          onClick={register}
        >
          Create your Amazon FAKE CLONE account
        </button>
      </div>
      <div className="bg-gray-50 border border-t-gray-200 py-3 text-sm">
        <div className="w-96 mx-auto my-1">
                <div className="mx-10 flex flex-row justify-between text-cyan-700 mb-1">
                        <p>Condition of Use</p>
                        <p>Privacy Notice</p>
                        <p>Help</p>
                </div>
                <div className="text-center">
                        <p>&copy; 1996-2022, Amazon FAKE CLONE, Inc. of its affiliates</p>
                </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
