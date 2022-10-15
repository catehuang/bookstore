import React from "react";
import { useNavigate } from "react-router-dom";

function Order({ eachOrder }) {
        const createdAt = eachOrder.createdAt.split("T")[0];
        const amount = (eachOrder.amount / 100).toFixed(2);
        const navigate = useNavigate();

        const formatPrice = (value) => {
                return value.toFixed(2);
        };

        const OrderInfo = () => {
                return (
                        <div className="bg-gray-100 py-3 px-5 sm:px-10 rounded-t-lg">
                                <div className="font-bold flex">
                                        <p className="pr-2">ORDER #: </p>
                                        <p>{eachOrder._id}</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
                                        <div className="flex col-span-2">
                                                <p className="pr-2">ORDER PLACED: </p>
                                                <p>{createdAt}</p>
                                        </div>
                                        <div className="flex">
                                                <p className="pr-2">TOTAL: </p>
                                                <p>CDN${amount}</p>
                                        </div>
                                        <div className="flex">
                                                <p className="pr-2">SHIP TO: </p>
                                                <p>{eachOrder.address.receiver}</p>
                                        </div>
                                        <div className="flex col-span-3">
                                                <p className="pr-2">ADDRESS: </p>
                                                <p className="">
                                                        {eachOrder.address.shippingCity},
                                                        {eachOrder.address.shippingProvince},
                                                        {eachOrder.address.shippingPostalCode}, Canada
                                                </p>
                                        </div>
                                </div>
                        </div>
                );
        };

        return (
                <div className="container text-gray-800 w-fit mx-auto border border-gray-200 rounded-lg">
                        <OrderInfo />

                        <div className="">
                                {eachOrder.products.map((product) => (
                                        <div className="py-5" key={product._id}>
                                                <div className="px-5 flex flex-col md:flex-row py-5">
                                                        <img
                                                                src={product.image}
                                                                alt=""
                                                                className="object-contain max-h-72 my-auto mx-auto mb-8 md:mb-0"
                                                        />
                                                        <div className="flex flex-col space-y-2 md:space-y-4 px-0 lg:px-10">
                                                                <p className="font-bold">{product.name}</p>
                                                                <p>Author: {product.author}</p>
                                                                <p className="line-clamp-3 lg:line-clamp-4 xl:line-clamp-5">
                                                                        Description: {product.description}
                                                                </p>
                                                                <p>Price: $ {formatPrice(product.price)}</p>
                                                                <p>Quantity: {product.quantity}</p>
                                                                <button
                                                                        className="text-base text-center border-yellow-500 bg-yellow-400 py-1 rounded hover:bg-yellow-500 px-5 w-fit mx-auto md:ml-0"
                                                                        onClick={() => navigate(`/books/${product._id}`)}
                                                                >
                                                                        Buy it again
                                                                </button>
                                                        </div>
                                                </div>
                                        </div>
                                ))}
                        </div>
                </div>
        );
}

export default Order;
