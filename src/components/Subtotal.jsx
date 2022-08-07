import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CurrencyFormat from "react-currency-format";
import { useNavigate } from "react-router-dom";

function Subtotal() {
        const user = useSelector(state => state.user.currentUser);
        const cart = useSelector(state => state.cart);
        const cartTotal = useSelector(state => state.cart.total);
        const [total, setTotal] = useState(cartTotal);
        const navigate = useNavigate();
        console.log(cartTotal);

        useEffect(() => {
                setTotal(cartTotal);
        });

        return (
                <div className="w-80 h-fit p-10 bg-white rounded-lg flex flex-col gap-5">
                        <div className="flex text-xs gap-2">
                                <span className="text-green-700">
                                        <CheckCircleIcon />
                                </span>
                                <p>
                                        Your order qualifies for FREE shipping (excludes remote locations).
                                        Choose this option at checkout. Details
                                </p>
                        </div>

                        <CurrencyFormat
                                renderText={(value) => (
                                        <div className="text-lg flex flex-col gap-3">
                                                <div className="flex justify-between">
                                                        <p className="">
                                                                Subtotal ({cart.quantity} item{cart.quantity > 1 ? "s)" : ")"} :
                                                        </p>
                                                        <p className="font-bold">{value}</p>
                                                </div>
                                                <p className="text-sm">
                                                        <input type="checkbox" /> This order contains a gift
                                                </p>

                                                {cart.quantity > 0 && user && (
                                                        <button
                                                                className="text-sm border border-yellow-300 bg-amber-200 w-full py-1 rounded hover:bg-amber-300"
                                                                onClick={(e) => navigate("/payment")}>
                                                                Proceed to Checkout
                                                        </button>
                                                )}

                                                {cart.quantity > 0 && !user && (
                                                        <div className="flex flex-col gap-3">
                                                                <button
                                                                        className="text-sm border border-yellow-300 bg-amber-200 w-full py-1 rounded hover:bg-amber-300"
                                                                        onClick={(e) => navigate("/login")}>
                                                                        Login
                                                                </button>
                                                                <button
                                                                        className="text-sm border border-yellow-300 bg-orange-200 w-full py-1 rounded hover:bg-orange-300"
                                                                        onClick={(e) => navigate("/register")}>
                                                                        Sign up
                                                                </button>
                                                        </div>
                                                )}

                                                {cart.quantity === 0 && (
                                                        <p className="text-sm text-center border border-gray-200 bg-gray-300 w-full py-2 rounded">
                                                                Proceed to Checkout
                                                        </p>
                                                )}
                                        </div>
                                )}
                                decimalScale={2}
                                fixedDecimalScale={true}
                                value={total}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                        />
                </div>
        );
}

export default Subtotal;
