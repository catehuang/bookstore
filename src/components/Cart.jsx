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
        dispatch(deleteProduct({ ...cartItem, product }));
    };

    useEffect(() => {
        dispatch(updateProduct({ ...product, quantity }));
        console.log(cartItem);
        //console.log(cart);
        // eslint-disable-next-line
    }, [quantity]);

    return (
        <div className="px-5 flex flex-col md:flex-row py-5 mb-5">
            <img
                className="object-contain max-h-72 md:w-fit my-auto mx-auto mb-8"
                src={product.image}
                alt=""
            />
            <div className="flex flex-col space-y-2 md:space-y-3 px-0 md:px-10">
                <Link to={`/books/` + product._id}>
                    <p className="font-bold">{product.name}</p>
                </Link>
                <p>Author: {product.author}</p>
                <p className="line-clamp-3 lg:line-clamp-4 xl:line-clamp-5">
                    Description: {product.description}
                </p>
                <div className="flex gap-2">
                    <p className="">Type of Book: Paperback</p>
                    <p className="text-cyan-700">
                        {product.quantity > 0 ? "(In Stock)" : "(Sold Out)"}
                    </p>
                </div>

                <CurrencyFormat
                    renderText={(value) => (
                        <p className="flex-end font-bold">Price: {value}</p>
                    )}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    value={product.price}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                />

                <div className="flex space-x-10">
                    <div className="flex space-x-3">
                        <p className="my-auto">Quantity: </p>
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
                    <button
                        className="bg-cyan-700 text-gray-100 py-1 rounded hover:bg-cyan-900 px-5"
                        onClick={handleDeleteProduct}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Cart;
