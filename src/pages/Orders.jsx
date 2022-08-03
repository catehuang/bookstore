import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Order from "../components/Order";
import { LoadOrders } from "../api/order";
import { useNavigate } from "react-router-dom";

function Orders() {
    const user = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        LoadOrders(dispatch, user);
    }, []);

    const orders = useSelector((state) => state.order.orders);
   //console.log(orders);
    return (
        <div className="">
            <p className="text-2xl text-center font-bold pt-10">Your Orders</p>

            {[...orders]?.reverse().map((eachOrder) => (
                <div className="my-10">
                    <Order key={eachOrder._id} eachOrder={eachOrder} />
                </div>
            ))}
            {orders.length === 0 && (
                <div className="mx-auto flex flex-col justify-center py-10 gap-5">
                    <p className="text-2xl text-center">No any orders</p>
                    <button className="text-cyan-600 text-lg font-bold" onClick={() =>navigate('/')}>Shop today's deals</button>               
                    <img
                        className="max-h-80 object-scale-down lg:object-contain"
                        src="https://m.media-amazon.com/images/G/15/cart/empty/kettle-desaturated._CB424694027_.svg"
                        alt=""
                    />
                </div>
            )}
        </div>
    );
}

export default Orders;
