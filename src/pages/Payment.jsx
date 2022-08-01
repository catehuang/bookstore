import React, { useState } from "react";
import { useSelector } from "react-redux";
import Cart from "../components/Cart";
import StripeCheckout from "react-stripe-checkout";

function Payment() {
    const cart = useSelector((state) => state.cart);
    const itemsInCart = cart.products;
    const cartTotal = cart.total.toFixed(2);
    const shippingFee = (cartTotal * 0.1).toFixed(2);
    const beforeTax = (Number(cartTotal) + Number(shippingFee)).toFixed(2);
    const gst = (beforeTax * 0.05).toFixed(2);
    const total = (Number(beforeTax) + Number(gst)).toFixed(2);
    const pk_stripe_key = "pk_test_51L2PfuDPS4dF2ifLrzPZD0G23PEWfMW4tALkMdPTcgyUl5j2bO6OmXWqoaRyMHQFEYqfoVLtIZIiE8rigU1pLvac00Hgc1joB2";
    const [stripeToken, setStripeToken] = useState(null);

    const onToken = (token) => {
        setStripeToken(token);
    }

    return (
        <div className="p-10 flex flex-col gap-5">
            <div>
                <p className="text-2xl font-bold px-5">
                    Check out ( {cart.quantity} ) items
                </p>
            </div>

            <div>
                <p className="text-xl font-bold px-5">Shipping Address</p>
                <input />
            </div>
            <div className="my-10 flex gap-5 flex-wrap">
                <div className="grow flex flex-col gap-5">
                    <div className="flex flex-col gap-5 bg-white rounded-lg">
                        <p className="text-xl font-bold px-5">Review Items and Shipping</p>
                        {itemsInCart.map((item) => (
                            <Cart key={item._id} cart={item} />
                        ))}
                    </div>

                    <StripeCheckout
                          name='BookStore'
                          billingAddress
                          shippingAddress
                          description={`Your total is $ ${total}`}
                          amount={total * 100}
                          token={onToken}
                          stripeKey={pk_stripe_key}
                        >
                        </StripeCheckout>
                </div>

                <div className="border border-gray-400 w-80 h-fit p-10 bg-white rounded-lg flex flex-col gap-5 mt-10">
                    <div className="flex flex-col gap-3">
                        <p className="text-xl font-bold border-b pb-2">Order Summary</p>

                        <div className="flex flex-col gap-1">
                            <div className="flex justify-between">
                                <p>Items:</p>
                                <p>${cartTotal}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Shipping & Handling:</p>
                                <p>${shippingFee}</p>
                            </div>

                            {cartTotal > 35 && (
                                <div className="flex justify-between">
                                    <p>Free Shipping</p>
                                    <p>- ${shippingFee}</p>
                                </div>
                            )}

                            <div className="flex justify-between">
                                <p>Total before tax:</p>
                                <p>${beforeTax}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Estimated GST/HST:</p>
                                <p>${gst}</p>
                            </div>
                        </div>

                        <div className="flex justify-between text-lg text-red-700 border-t pt-2">
                            <p>Order Total</p>
                            <p>${total}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Payment;
