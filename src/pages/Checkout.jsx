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
                <div className="bg-gray-200 p-5">
                        <Advertizing />

                        {/* main window */}
                        <div className="my-5 flex space-y-5 sm:gap-5 sm:space-y-0 flex-wrap">
                                {/* main left window */}
                                <div className="grow">
                                        {cart.quantity === 0 && <EmptyCart />}
                                        {cart.quantity !== 0 && (
                                                <div className="flex flex-col gap-5 py-10 bg-white rounded-lg">
                                                        
                                                                <p className="text-2xl font-bold">Shopping Cart</p>
                                                                {/* <p>Price</p> */}
                                                        
                                                        {products.map((item) => (
                                                                <Cart key={item._id} product={item} />
                                                        ))}
                                                </div>
                                        )}
                                </div>
                                {/* main right window */}
                                 <Subtotal />
                        </div>

                        {/* more info on the bottom */}
                        <div className="text-xs py-5 flex flex-col gap-2">
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