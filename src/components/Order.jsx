import React from "react";
import { useNavigate } from "react-router-dom";

function Order({ eachOrder }) {
        const createdAt = eachOrder.createdAt.split("T")[0];
        const amount = (eachOrder.amount / 100).toFixed(2);
        const navigate = useNavigate();

        const formatPrice = (value) => {
                return value.toFixed(2);
        }

        const OrderInfo = () => {
                return (
                        <div className="bg-gray-200 px-5 py-3 text-sm">
                                <div className="flex gap-5">
                                        <div className="flex flex-col">
                                                <p>ORDER PLACED</p>
                                                <p>{createdAt}</p>
                                        </div>
                                        <div className="flex flex-col">
                                                <p>TOTAL</p>
                                                <p>CDN${amount}</p>
                                        </div>
                                        <div className="flex flex-col">
                                                <p>SHIP TO</p>
                                                <p>{eachOrder.address.receiver}</p>
                                        </div>
                                        <div className="flex flex-col">
                                                <p>ORDER # {eachOrder._id}</p>        
                                                <p> ADDRESS {" "}
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
                <div className="border rounded-lg text-gray-800 w-fit mx-auto">
                        <OrderInfo />

                        <div className="">
                                {eachOrder.products.map((product) => (
                                        <div className="py-5 border-b rounded">
                                                <div className="flex gap-5" key={product._id}>
                                                        <img
                                                                src={product.image}
                                                                alt=""
                                                                className="object-contain h-48 w-48 mx-auto"
                                                        />          
                                                <div className="flex flex-col gap-2 w-96 mx-5">
                                                        <p className="font-bold">{product.name}</p>
                                                        <p>Author: {product.author}</p>

                                                        <p>Price: $ {formatPrice(product.price)}</p>
                                                        <p>Quantity: {product.quantity}</p>
                                                        <button className="text-sm text-center border-yellow-500 bg-yellow-400 py-1 rounded hover:bg-yellow-500 px-5 w-fit" onClick={() => navigate(`/books/${product._id}`)}>Buy it again</button>
                                                        </div>                               
                                                </div>
                                        </div>
                                ))}
                        </div>
                </div>
        );
}

export default Order;
