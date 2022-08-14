
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function EmptyCart() {

        const user = useSelector (state => state.user.currentUser);
        const navigate = useNavigate();

        return (
                <div className="grow bg-white rounded-lg p-10">
                        <div className="flex flex-row flex-wrap">
                                <img
                                        className="max-h-60 object-scale-down lg:object-contain"
                                        src="https://m.media-amazon.com/images/G/15/cart/empty/kettle-desaturated._CB424694027_.svg"
                                        alt=""
                                />

                                <div className="my-auto mx-auto">
                                        <p className="text-lg sm:text-2xl font-bold">Your Shopping Cart is empty</p>
                                        <Link to="/">
                                                <p className="text-cyan-600 mt-2 mb-5">Shop today's deals</p>
                                        </Link>
                                        {!user &&
                                        <div className="grid grid-cols-2 gap-3">
                                                <Link to="/login">
                                                        <button className="border border-yellow-300 bg-amber-200 w-full rounded hover:bg-amber-300 py-1 px-4 flex-none">
                                                                Sign in
                                                        </button>
                                                </Link>
                                                <Link to="/register">
                                                        <button className="border border-gray-300 bg-white w-full rounded hover:bg-amber-300 py-1 px-4 flex-none">
                                                                Sign up
                                                        </button>
                                                </Link>
                                        </div>
                                        }

                                        {user && 
                                                <div>
                                                        <button className="border border-yellow-300 bg-amber-200 w-full rounded hover:bg-amber-300 py-1 px-4 flex-none" onClick={() => navigate('/')}>Let's go shopping</button>       
                                                </div>
                                        }
                                </div>
                        </div>
                </div>
        );
}

export default EmptyCart;
