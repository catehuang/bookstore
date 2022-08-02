import React, { useState, useEffect } from "react";
import CurrencyFormat from "react-currency-format";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { updateProduct, deleteProduct } from "../reducers/cartSlice";


function Cart({ product }) {
        const user = useSelector(state => state.user.currentUser);
        const cart = useSelector(state => state.cart);
        const cartItem = cart.products;
        //const total = useSelector(state => state.cart.total);
        const [quantity, setQuantity]= useState(cartItem.find((item => item._id === product._id)).quantity);
        const dispatch = useDispatch();

        const handleDeleteProduct = () => {
                dispatch(deleteProduct(...cartItem, product));
        }

        useEffect(() => {
                dispatch(updateProduct({ ...product, quantity }));
                //console.log(cartItem);
                //console.log(cart);
        }, [quantity])

        return (
                <div>
                        <div>
                                <div className="flex gap-10 p-10 mx-5 border-gray-300 border-t">
                                        <img className="h-48" src={product.image} alt="" />
                                        <div className="grow flex flex-col gap-1 text-sm">
                                                <p className="text-xl py-2"><Link to={`/books/` + product._id}>{product.name}</Link></p>
                                                <p className="text-base">by {product.author}</p>
                                                <p className="">Paperback</p>
                                                <p className="text-cyan-700">In Stock</p>
                                                <div className="flex my-auto">
                                                        <input className="text-sm" type="checkbox" />
                                                        <p className="pl-1 text-xs">This will be a gift</p>
                                                </div>

                                                <div className="flex gap-5">
                                                        <div className="flex gap-2">
                                                                <div className="flex gap-5">
                                                                        <p className="my-auto text-base">Quantity: </p>
                                                                        <select
                                                                                className="border border-gray-400 rounded px-1"
                                                                                defaultValue={quantity} onChange={(e) => setQuantity(e.target.value)}>
                                                                       
                                                                                {Array.from({ length: 10 }, (_, num) => (
                                                                                        <option key={num + 1} value={num + 1} >
                                                                                                {num + 1}
                                                                                        </option>
                                                                                ))}
                                                                        </select>
                                                                </div>
                                                        </div>

                                                        <button className="text-sm border border-yellow-300 bg-amber-200 rounded hover:bg-amber-300 w-24 h-6" onClick={handleDeleteProduct} >
                                                                Delete
                                                        </button>
                                                </div>
                                        </div>
                                        <CurrencyFormat
                                                renderText={(value) => <p className="font-bold">{value}</p>}
                                                decimalScale={2}
                                                fixedDecimalScale={true}
                                                value={product.price}
                                                displayType={"text"}
                                                thousandSeparator={true}
                                                prefix={"$"}
                                        />
                                </div>
                        </div>
                </div>
        );
}

export default Cart;
