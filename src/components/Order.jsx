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
                        <div className="bg-gray-200 py-3 px-10">
                                <div className="font-bold flex">
                                        <p className="pr-2">ORDER #: </p>
                                        <p>{eachOrder._id}</p>
                                </div>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
                                        <div className="flex">
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
                                        <div className="flex flex-wrap col-span-2">
                                                <p className="pr-2">ADDRESS: </p>
                                                <p>
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
                <div className="container border rounded-lg text-gray-800 w-fit sm:w-4/5 mx-auto">
                        <OrderInfo />

                        <div className="">
                                {eachOrder.products.map((product) => (
                                        <div className="py-5 border-b rounded" key={product._id}>
                                                <div className="grid md:grid-cols-3 py-5">
                                                        <img
                                                                src={product.image}
                                                                alt=""
                                                                className="object-contain max-h-72 my-auto mx-auto mb-8 md:mb-0"
                                                        />
                                                        <div className=" md:col-span-2 mx-10 md:mr-10 flex flex-col space-y-2">
                                                                <p className="font-bold">{product.name}</p>
                                                                <p>Author: {product.author}</p>
                                                                <p className="line-clamp-2 lg:line-clamp-4 xl:line-clamp-5">
                                                                        Description: {product.description}
                                                                </p>
                                                                <p>Price: $ {formatPrice(product.price)}</p>
                                                                <p>Quantity: {product.quantity}</p>
                                                                <button
                                                                        className="text-base text-center border-yellow-500 bg-yellow-400 py-1 rounded hover:bg-yellow-500 px-5 w-fit"
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
