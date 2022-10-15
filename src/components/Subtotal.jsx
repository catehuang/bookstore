import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CurrencyFormat from "react-currency-format";
import { useNavigate } from "react-router-dom";

function Subtotal() {
    const user = useSelector((state) => state.user.currentUser);
    const cart = useSelector((state) => state.cart);
    const [total, setTotal] = useState(cart.total);
    const navigate = useNavigate();

    useEffect(() => {
        setTotal(cart.total);
    }, [cart]);

    return (
        <div className="flex border bg-[#002533] rounded-lg p-5">
            <CurrencyFormat
                renderText={(value) => (
                    <div className="flex flex-col lg:flex-row py-auto mx-auto space-y-5 lg:space-y-0">
                        <div className="flex space-x-5 text-xl font-bold text-gray-100 mx-auto">
                            <p className="">
                                Subtotal ({cart.quantity} item{cart.quantity > 1 ? "s)" : ")"} :
                            </p>
                            <p className="">{value}</p>
                        </div>

                        <div className="font-bold mx-auto">
                            {cart.quantity > 0 && user && (
                                <button
                                    className="border border-yellow-400 bg-amber-200 rounded hover:bg-amber-300 px-3 py-1"
                                    onClick={(e) => navigate("/payment")}
                                >
                                    Checkout
                                </button>
                            )}

                            {cart.quantity > 0 && !user && (
                                <div className="flex space-x-5">
                                    <button
                                        className=" border border-yellow-400 bg-amber-200  rounded hover:bg-amber-300 px-5 py-1"
                                        onClick={(e) => navigate("/login")}
                                    >
                                        Login
                                    </button>
                                    <button
                                        className="border border-yellow-400 bg-orange-200 rounded hover:bg-orange-300 px-3 py-1"
                                        onClick={(e) => navigate("/register")}
                                    >
                                        Sign up
                                    </button>
                                </div>
                            )}

                            {cart.quantity === 0 && (
                                <p className="border border-gray-200 bg-gray-300 rounded ">
                                    Checkout
                                </p>
                            )}
                        </div>
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
