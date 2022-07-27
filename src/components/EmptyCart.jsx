
import React from "react";
import { Link } from "react-router-dom";

function EmptyCart() {

        return (
                <div className="grow bg-white rounded-lg p-10">
                        <div className="flex flex-row">
                                <img
                                        className="h-72"
                                        src="https://m.media-amazon.com/images/G/15/cart/empty/kettle-desaturated._CB424694027_.svg"
                                        alt=""
                                />

                                <div className="my-auto mx-auto">
                                        <p className="text-2xl font-bold">Your Shopping Cart is empty</p>
                                        <Link to="/">
                                                <p className="text-cyan-600 mt-2 mb-5">Shop today's deals</p>
                                        </Link>
                                        <div className="flex justify-around mx-auto">
                                                <Link to="/login">
                                                        <button className="border border-yellow-300 bg-amber-200 w-full rounded hover:bg-amber-300 py-1 px-4">
                                                                Sign in your account
                                                        </button>
                                                </Link>
                                                <Link to="/register">
                                                        <button className="border border-gray-300 bg-white w-full rounded hover:bg-amber-300 py-1 px-4">
                                                                Sign up now
                                                        </button>
                                                </Link>
                                        </div>
                                </div>
                        </div>
                </div>
        );
}

export default EmptyCart;
