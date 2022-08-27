import React, { useState, useEffect } from "react";
import CurrencyFormat from "react-currency-format";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { updateProduct, deleteProduct } from "../reducers/cartSlice";

function Cart({ product }) {
    //const user = useSelector(state => state.user.currentUser);
    const cart = useSelector((state) => state.cart);
    const cartItem = cart.products;
    //const total = useSelector(state => state.cart.total);
    const [quantity, setQuantity] = useState(
        cartItem.find((item) => item._id === product._id).quantity
    );
    const dispatch = useDispatch();

    const handleDeleteProduct = () => {
        dispatch(deleteProduct(...cartItem, product));
    };

    useEffect(() => {
        dispatch(updateProduct({ ...product, quantity }));
        //console.log(cartItem);
        //console.log(cart);
        // eslint-disable-next-line
    }, [quantity]);

    return (
        <div className="flex flex-col space-y-5 sm: justify-between sm:flex-row gap-5 pb-0 mx-5 border-gray-300 border-t">
            <img className="h-60 sm:h-48 object-contain mx-auto flex-none" src={product.image} alt="" />
            <div className="grow flex flex-col space-y-3 text-xs sm:text-sm">
                <p className="text-base sm:text-xl">
                    <Link to={`/books/` + product._id}>{product.name}</Link>
                </p>
                <p className="text-sm sm:text-base">by {product.author}</p>
                <div className="flex gap-2">
                    <p className="">Paperback</p>
                    <p className="text-cyan-700">
                        {product.quantity > 0 ? "In Stock" : "Sold Out"}
                    </p>
                </div>
                <div className="flex">
                    <input className="text-sm" type="checkbox" />
                    <p className="pl-1 text-xs">This will be a gift</p>
                </div>

                <div className="flex space-x-3 sm:space-x-10">
                    <div className="flex space-x-2">
                        <div className="flex space-x-3">
                            <p className="my-auto text-sm sm:text-base">Quantity: </p>
                            <select
                                className="border border-gray-400 rounded px-1"
                                defaultValue={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                            >
                                {Array.from({ length: 10 }, (_, num) => (
                                    <option key={num + 1} value={num + 1}>
                                        {num + 1}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button
                        className="text-sm border border-yellow-300 bg-amber-200 rounded hover:bg-amber-300 px-5 sm:px-8 py-0.5"
                        onClick={handleDeleteProduct}
                    >
                        Delete
                    </button>
                </div>
            </div>

            <CurrencyFormat
                renderText={(value) => <p className="flex-end font-bold pb-5">{value}</p>}
                decimalScale={2}
                fixedDecimalScale={true}
                value={product.price}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />
        </div>
    );
}

export default Cart;
