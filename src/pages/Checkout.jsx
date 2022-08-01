import React from "react";
import { useSelector } from "react-redux";
import Advertizing from "../components/Advertizing";
import Cart from "../components/Cart";
import EmptyCart from "../components/EmptyCart";
import Subtotal from "../components/Subtotal";

function Checkout() {
        const user = useSelector((state) => state.user.currentUser);
        const cart = useSelector((state) => state.cart.products);
        const cartLength = cart.length;

        return (
                <div className="bg-gray-200 p-10">
                        <Advertizing />

                        {/* main window */}
                        <div className="my-10 flex gap-5 flex-wrap">
                                {/* main left window */}
                                <div className="grow">
                                        {cartLength === 0 && <EmptyCart />}
                                        {cartLength !== 0 && (
                                                <div className="flex flex-col gap-5 py-10 bg-white rounded-lg">
                                                        <div className="flex justify-between px-16">
                                                                <p className="text-2xl font-bold">Shopping Cart</p>
                                                                <p>Price</p>
                                                        </div>
                                                        {cart.map((item) => (
                                                                <Cart key={item._id} cart={item} />
                                                        ))}
                                                </div>
                                        )}
                                </div>
                                {/* main right window */}
                                 <Subtotal />
                        </div>

                        {/* more info on the bottom */}
                        <div className="text-sm py-5">
                                <p>
                                        The price and availability of items at BookStore are subject to
                                        change. The shopping cart is a temporary place to store a list of your
                                        items and reflects each item's most recent price.
                                </p>
                                <p>
                                        Do you have a gift card or promotional code? We'll ask you to enter
                                        your claim code when it's time to pay.
                                </p>
                        </div>
                </div>
        );
}

export default Checkout;
