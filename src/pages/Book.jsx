import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../reducers/cartSlice";
import { axios } from "../axios";
import { UpdateCart } from "../api/cart";


function Book() {
    // return an object
    const user = useSelector(state => state.user.currentUser);
    const cart = useSelector(state => state.cart);
    const { id } = useParams();
    const [book, setBook] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const newDate = new Date();
    const month = newDate.getMonth();
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    useEffect(() => {
        const getBook = async () => {
            try {
                const response = await axios.get(`/books/find/${id}`);
                setBook(response.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        getBook();
    }, [id]);

    const handleAddToCart = () => {
        dispatch(addProduct({ ...book, quantity }));
        // if (user)
        // {
        //     UpdateCart(cart);
        //     console.log(cart);
        // }
        navigate('/');     
    }

const book_price_integer = Math.floor(book.price).toString();
const book_price_fraction = (book.price - Math.floor(book.price))
    .toFixed(2)
    .substring(2);
const numberFormat = new Intl.NumberFormat("en-US");
const book_reviews = numberFormat.format(book.reviews);

return (
    <div>
        <p className="py-5 px-10 text-[#005e80]">
            <Link to="/">&lt; back to result</Link>
        </p>

        <div className="flex flex-col gap-10 mx-auto py-10 px-20">
            <div className="flex gap-10">
                <img className="object-contain w-72 h-fit" src={book.image} alt="" />
                <div className="flex flex-col w-1/2 grow gap-2">
                    <p className="text-3xl">{book.name}</p>
                    <p className="text-2xl text-gray-600">Paperback</p>
                    <p>
                        by<span className="text-sky-800  px-1">{book.author}</span>
                        (Author)
                    </p>

                    <div className="text-amber-500 flex gap-2">
                        <p>
                            <Rating
                                value={Number(`${book.stars}`)}
                                precision={0.5}
                                size="small"
                                readOnly
                            />
                        </p>

                        <p className="text-sm text-sky-800">{book_reviews} ratings</p>
                    </div>
                    <p>{book.description}</p>
                </div>

                <div className="invisible lg:visible flex flex-col w-72 h-fit border border-gray-300 rounded p-5 gap-5 text-sm">
                    <div className="flex flex-col gap-5">
                        <div className="flex justify-between">
                            <p className="my-auto text-base font-bold">In Stock</p>
                            <p className="text-red-700 flex font-bold">
                                <span className="text-xs mt-1">$</span>
                                <span className=" text-xl">{book_price_integer}</span>
                                <span className="text-xs mt-1">{book_price_fraction}</span>
                            </p>
                        </div>
                        <p>
                            FREE delivery {monthNames[month + 1]} 1 - 3 on your first order
                        </p>
                        <p>Usually ships within 1 week.</p>
                        <div className="flex gap-2">
                            <div className="flex gap-5">
                                <p className="my-auto text-base">Quantity: </p>
                                <select
                                    className="border border-gray-400 rounded px-1"
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
                            className="text-sm text-center border-yellow-500 bg-yellow-400 w-full py-1 rounded hover:bg-yellow-500"
                            onClick={handleAddToCart}
                        >
                            Add to Cart
                        </button>

                        <button
                            className="text-sm text-center border-yellow-500 bg-orange-400 w-full py-1 rounded hover:bg-orange-500"
                            onClick={() => navigate("/checkout")}
                        >
                            Buy now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
}

export default Book;
