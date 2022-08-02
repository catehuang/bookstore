import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Cart from "../components/Cart";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { axios } from "../axios";
import { UpdateCart } from "../api/cart";

function Payment() {
    const user = useSelector((state) => state.user.currentUser);
    const cart = useSelector((state) => state.cart);
    const itemsInCart = cart.products;
    const cartTotal = cart.total.toFixed(2);
    const shippingFee = (cartTotal * 0.1).toFixed(2);
    const beforeTax = (Number(cartTotal) + Number(shippingFee)).toFixed(2);
    const gst = (beforeTax * 0.05).toFixed(2);
    const total = (Number(beforeTax) + Number(gst)).toFixed(2);
    const amount = (total * 100).toFixed(0);

    const [receiver, setReceiver] = useState("");
    const [shippingAddress, setShippingAddress] = useState("");
    const [shippingCity, setShippingCity] = useState("");
    const [shippingProvince, setShippingProvince] = useState("");
    const [shippingPostalCode, setShippingPostalCode] = useState("");
    const [validShippingInfo, setValidShippingInfo] = useState(false);

    const [clientSecret, setClientSecret] = useState("");
    const stripe = useStripe();
    const elements = useElements();
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        const getClientSecret = async () => {
            const token = user.accessToken;

            const axiosAuth = axios.create({
                headers: { token: `Bearer ${token}` },
            });
            const response = await axiosAuth.post(`/payments/create`, {
                amount: amount,
            });
            setClientSecret(response.data.clientSecret);
        };
        getClientSecret();
    }, [cart]);


    console.log("THE SECRET IS >>>", clientSecret);

    const handleSubmit = (e) => {
        setProcessing(true);
        e.preventDefault();
    };

    const handleChange = (e) => {
        setDisabled(e.empty);
        setError(e.error ? e.error.message : "");
    };

    useEffect(() => {
        if (receiver && shippingAddress && shippingCity && shippingProvince && shippingPostalCode)
        {
            setValidShippingInfo(true);
        }
    })

    return (
        <div className="p-10 flex flex-col gap-5">
            <div>
                <p className="text-2xl font-bold px-5">
                    Check out ( {cart.quantity} ) items
                </p>
            </div>
            <div className="px-5 flex flex-col gap-3">
                <p className="text-xl font-bold">Shipping Information</p>
                <form>
                <div className="flex flex-col gap-2 w-96 px-10">
                    <div className="flex flex-col gap-2">
                        <p>Recipient's name</p>
                        <input
                            type="text"
                            value={receiver}
                            className="border border-gray-600 rounded"
                            onChange={(e) => setReceiver(e.target.value)} required
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p>Shipping address</p>
                        <input
                            type="text"
                            value={shippingAddress}
                            className="border border-gray-600 rounded"
                            onChange={(e) => setShippingAddress(e.target.value)} required
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p>City</p>
                        <input
                            type="text"
                            value={shippingCity}
                            className="border border-gray-600 rounded"
                            onChange={(e) => setShippingCity(e.target.value)} required
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p>Province/Territory</p>
                        <input
                            type="text"
                            value={shippingProvince}
                            className="border border-gray-600 rounded"
                            onChange={(e) => setShippingProvince(e.target.value)} required
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p>Postal code</p>
                        <input
                            type="text"
                            value={shippingPostalCode}
                            className="border border-gray-600 rounded"
                            onChange={(e) => setShippingPostalCode(e.target.value)} required
                        />
                    </div>
                </div>
                </form>
            </div>

            <div className="my-10 flex gap-5 flex-wrap">
                <div className="grow flex flex-col gap-5">
                    <div className="flex flex-col gap-5 bg-white rounded-lg">
                        <p className="text-xl font-bold px-5">Review Items and Shipping</p>
                        {itemsInCart.map((item) => (
                            <Cart key={item._id} product={item} />
                        ))}
                    </div>
                    <div>
                        <p className="text-xl font-bold px-5">Payement Method</p>
                        <div className="m-10 p-10 rounded bg-gray-100 w-fit">
                            <form onSubmit={handleSubmit} className="w-96 ">
                                <CardElement
                                    onChange={handleChange}
                                    className="w-96 p-5 text-lg border border-gray-400 rounded-lg bg-white"
                                />
                                <p className="text-lg text-red-700 py-5">Order Total: ${total}</p>
                                <button
                                    disabled={!stripe || !validShippingInfo}
                                    className="text-center border-yellow-500 bg-yellow-400 w-full py-1 rounded hover:bg-yellow-500"
                                >
                                    Place Order
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* right window */}
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
