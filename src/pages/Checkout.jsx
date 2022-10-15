import React from "react";
import { useSelector } from "react-redux";
import Advertizing from "../components/Advertizing";
import Cart from "../components/Cart";
import EmptyCart from "../components/EmptyCart";
import Subtotal from "../components/Subtotal";

function Checkout() {
    const cart = useSelector((state) => state.cart);
    const products = cart.products;

    return (
        <div className="bg-gray-50 sm:p-5">
            <div className="sm:w-4/5 mx-auto">
                <div className="border border-gray-300 rounded-lg">
                    <Advertizing />
                </div>

                {/* main window */}
                <div className="my-5 flex flex-wrap space-y-5 sm:gap-5 sm:space-y-0">
                    {/* main left window */}
                    <div className="border border-gray-300 rounded-lg  sm: grow">
                        {cart.quantity === 0 && <EmptyCart />}
                        {cart.quantity !== 0 && (
                            <div className="flex flex-col gap-5 py-5 bg-white rounded-lg">
                                <p className="text-2xl font-bold text-center">Shopping Cart</p>
                                {/* <p>Price</p> */}
                                <div className="px-10">
                                    {products.map((item) => (
                                        <Cart key={item._id} product={item} />
                                    ))}
                                </div>
                                <div className="mx-auto w-4/5">
                                    <Subtotal />
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="text-xs px-5 sm:text-sm flex flex-col gap-2 text-cyan-900">
                        <p>
                            The price and availability of items at BookStore are subject to
                            change. The shopping cart is a temporary place to store a list of
                            your items and reflects each item's most recent price.
                        </p>
                        <p>
                            Do you have a gift card or promotional code? We'll ask you to
                            enter your claim code when it's time to pay.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
