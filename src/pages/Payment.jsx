import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cart from "../components/Cart";
import { CardElement, useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { axios } from "../axios";
import { LoadOrders } from "../api/order";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../reducers/cartSlice";

function Payment() {
    const user = useSelector((state) => state.user.currentUser);
    const cart = useSelector((state) => state.cart);
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
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState(null);
    const token = user.accessToken;
    const axiosAuth = axios.create({
        headers: { token: `Bearer ${token}` },
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // useEffect(() => {
    //     if (order.orders.length > 0) {
    //         const latestOrder = order.orders[order.orders.length - 1].address;
    //         setReceiver(latestOrder.receiver);
    //         setShippingAddress(latestOrder.shippingAddress);
    //         setShippingCity(latestOrder.shippingCity);
    //         setShippingProvince(latestOrder.shippingProvince);
    //         setShippingPostalCode(latestOrder.shippingPostalCode);
    //     }
    //     // eslint-disable-next-line
    // }, []);

    const Receiver = () => {
        return (
            <div>
                <p>Recipient's name</p>
                <div className="flex justify-between">
                    <input
                        type="text"
                        value={receiver}
                        className="border border-gray-600 rounded px-2 w-full"
                        onChange={(e) =>
                            setReceiver(e.target.value.replace(/[^0-9-_.a-z\s]/gi, ""))
                        }
                        required 
                    />
                </div>
            </div>
        );
    };

    const Address = () => {
        return (
            <div className="flex flex-col gap-2">
                <p>Shipping address</p>
                <div className="flex justify-between">
                    <input
                        type="text"
                        value={shippingAddress}
                        className="border border-gray-600 rounded px-2 w-full"
                        onChange={(e) =>
                            setShippingAddress(e.target.value.replace(/[^0-9-_.a-z\s]/gi, ""))
                        }
                        required 
                    />
                </div>
            </div>
        );
    };

    const City = () => {
        return (
            <div className="flex flex-col gap-2">
                <p>City</p>
                <div className="flex justify-between">
                    <input
                        type="text"
                        value={shippingCity}
                        className="border border-gray-600 rounded px-2 w-full"
                        onChange={(e) =>
                            setShippingCity(e.target.value.replace(/[^0-9-_.a-z\s]/gi, ""))
                        }
                        required 
                    />
                </div>
            </div>
        );
    };

    const Province = () => {
        return (
            <div className="flex flex-col gap-2">
                <p>Province/Territory</p>
                <div className="flex justify-between">
                    <select
                        value={shippingProvince}
                        className="border border-gray-600 rounded px-2 w-full"
                        onChange={(e) => setShippingProvince(e.target.value)}
                    >
                        <option value=""></option>
                        <option value="Alberta">Alberta</option>
                        <option value="British Columbia">British Columbia</option>
                        <option value="Manitoba">Manitoba</option>
                        <option value="New Brunswick">New Brunswick</option>
                        <option value="Newfoundland and Labrador">
                            Newfoundland and Labrador
                        </option>
                        <option value="Northwest Territories">Northwest Territories</option>
                        <option value="Nova Scotia">Nova Scotia</option>
                        <option value="Nunavut">Nunavut</option>
                        <option value="Ontario">Ontario</option>
                        <option value="Prince Edward Island">Prince Edward Island</option>
                        <option value="Quebec">Quebec</option>
                        <option value="Saskatchewan">Saskatchewan</option>
                        <option value="Yukon">Yukon</option>
                    </select>
                </div>
            </div>
        );
    };

    const PostalCode = () => {
        return (
            <div className="flex flex-col gap-2">
                <p>Postal code</p>
                <div className="flex justify-between">
                    <input
                        type="text"
                        value={shippingPostalCode}
                        className="border border-gray-600 rounded px-2 w-full"
                        onChange={(e) =>
                            setShippingPostalCode(
                                e.target.value.replace(/[^0-9-_.a-z\s]/gi, "")
                            )
                        }
                        required 
                    />
                </div>
            </div>
        );
    };

    const Summary = () => {
        return (
            <div className="sm:border border-gray-400 w-full sm:w-80 h-fit p-5 bg-white rounded-lg flex flex-col gap-5 mx-auto">
                    <div className="flex flex-col gap-3">
                        <p className="text-xl font-bold border-b pb-2">Order Summary</p>

                        <div className="flex flex-col gap-1 sm:px-5">
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

                        <div className="flex justify-between text-lg text-red-700 border-t pt-2 sm:px-5">
                            <p>Order Total</p>
                            <p>${total}</p>
                        </div>
                    </div>
                </div>
        )
    }

    useEffect(() => {
        if (
            receiver.length > 1 &&
            shippingAddress.length > 2   &&
            shippingCity.length > 1  &&
            shippingProvince.length > 2  &&
            shippingPostalCode.length > 5 
        ) 
        {
            setValidShippingInfo(true);
        }
    }, [receiver, shippingAddress, shippingCity, shippingProvince, shippingPostalCode]);


    useEffect(() => {
        const getClientSecret = async () => {
            const response = await axiosAuth.post(`/payments/create`, {
                amount: amount,
            });
            //console.log(response.data.client_secret);
            setClientSecret(response.data.client_secret);
        };
        getClientSecret();
        // eslint-disable-next-line
    },[cart]);

    const appearance = {
        theme: 'flat'
      };
      
    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        try {
            // stripe.confirmCardPayment will return a Promise which resolves with a result object.
            await stripe
                // .confirmCardPayment(clientSecret, {
                //     payment_method: {
                //         card: elements.getElement(CardElement),
                //     },
                //     appearance
                // })
                .confirmPayment({
                    elements,
                    appearance
                })
                .then(async (result) => {
                    const response = await axiosAuth.post(`/orders`, {
                        userId: user._id,
                        products: cart.products.map((item) => ({
                            _id: item._id,
                            name: item.name,
                            image: item.image,
                            author: item.author,
                            categories: item.categories,
                            featuredCategory: item.featuredCategory,
                            price: item.price,
                            quantity: item.quantity,
                        })),
                        payment_id: result.paymentIntent.id,
                        amount: result.paymentIntent.amount,
                        created: result.paymentIntent.created,
                        address: {
                            receiver: `${receiver}`,
                            shippingAddress: `${shippingAddress}`,
                            shippingCity: `${shippingCity}`,
                            shippingProvince: `${shippingProvince}`,
                            shippingPostalCode: `${shippingPostalCode}`,
                        },
                        status: result.paymentIntent.status,
                    });

                    if (response.status === 200)
                    {
                        setSucceeded(true);
                        setError(null);         
                    }
                });
        } catch (error) {
            console.log(error);
            setError(true);
        }

        if (!error)
        {
            setProcessing(false);
            dispatch(clearCart());
            LoadOrders(dispatch, user._id);
            navigate("/orders");        
        }
    };

    const handleChange = (e) => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setError(e.error ? e.error.message : "");
    };

    return (
        <div className="p-5 sm:p-10 flex flex-col space-y-5 flex-wrap">
            <div>
                <p className="text-2xl font-bold px-5">
                    Check out ( {cart.quantity} ) items
                </p>
            </div>
            <div className="px-5 flex flex-col space-y-3">
                <p className="text-xl font-bold">Shipping Information</p>
                <form className="flex flex-col gap-2 sm:w-96 sm:px-10">
                    {/* calling the component with {compName()} instead of <compName /> or the input field lose focus after typing a character */}
                    {Receiver()}
                    {Address()}
                    {City()} 
                    {Province()}
                    {PostalCode()}
                </form>
            </div>

            <div className="my-10 flex gap-5 flex-wrap">
                <div className="grow flex flex-col gap-5">
                    <div className="flex flex-wrap gap-5">
                        <div className="flex flex-col gap-5 bg-white rounded-lg sm:grow">
                            <p className="text-xl font-bold px-5">Review Items and Shipping</p>
                            {cart.products.map((item) => (
                                <Cart key={item._id} product={item} />
                            ))}
                            <p className="border-gray-300 border-t pt-5"></p>
                        </div>   
                        <Summary />                     
                    </div>

                    <div className="">
                        <p className="text-xl font-bold px-5 pt-5">Payement Method</p>
                        <div className="ml-5 m-10 mt-5 sm:ml-10 p-5 sm:p-10 rounded-lg bg-gray-100 w-fit mx-auto">
                            <form onSubmit={handleSubmit} className="sm:w-80 flex flex-col">
                                <PaymentElement
                                    onChange={handleChange}
                                    className="sm:w-80 sm:p-5 text-lg border border-gray-400 rounded-lg bg-white py-5"
                                />
                                <p className="text-lg text-red-700 py-2 sm:py-5">
                                    Order Total: ${total}
                                </p>
                                <button
                                    disabled={
                                        !stripe || !validShippingInfo || processing || succeeded
                                    }
                                    className="text-center border-yellow-500 bg-yellow-400 w-full py-1 rounded hover:bg-yellow-500 disabled:bg-gray-300"
                                >
                                    {processing ? "Processing" : "Buy Now"}
                                </button>
                            </form>
                            {
                                !validShippingInfo && (
                                <p className="text-center pt-2 text-green-500">
                                    Please provide shipping Information
                                </p>
                            )}

                            {
                                validShippingInfo && (
                                <div>
                                    <p className="text-red-500">Do not use your credit card number !!</p>
                                    <p className="text-red-500">Please use 4242424... to complete the payment</p>                                
                                </div>                                    
                                )
                            }


                            {error && <div>{error}</div>}
                        </div>
                    </div>
                </div>

                
            </div>
        </div>
    );
}

export default Payment;
