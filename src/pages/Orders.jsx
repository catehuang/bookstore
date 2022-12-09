import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Order from "../components/Order";
import { LoadOrders } from "../api/order";
import { useNavigate } from "react-router-dom";
import Suggestion from "../components/Suggestion";

function Orders() {
    const user = useSelector((state) => state.user.currentUser);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        LoadOrders(dispatch, user);
        // eslint-disable-next-line
    });

    const orders = useSelector((state) => state.order.orders);

    return (
        <div className="mx-auto my-10 p-10">
            <p className="text-2xl text-center font-bold">Your Orders</p>
            <div className="mb-20">
            {[...orders]?.reverse().map((eachOrder) => (
                <div className="my-10" key={eachOrder._id}>
                    <Order eachOrder={eachOrder} />
                </div>
            ))}
            </div>

            {orders.length === 0 && (
                <div className="mx-auto flex flex-col justify-center py-10 gap-5">
                    <p className="text-2xl text-center">No any orders</p>
                    <button
                        className="text-cyan-600 text-lg font-bold"
                        onClick={() => navigate("/")}
                    >
                        Shop today's deals
                    </button>
                    <img
                        className="mx-auto w-4/5 h-40"
                        src="https://m.media-amazon.com/images/G/15/cart/empty/kettle-desaturated._CB424694027_.svg"
                        alt=""
                    />
                </div>
            )}
            <div className="py-10 mx-auto">
                <p className="text-lg font-bold">Recommended for you</p>
                <Suggestion selectedBook={null} />
            </div>
        </div>
    );
}

export default Orders;
