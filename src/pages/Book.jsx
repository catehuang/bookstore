import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
import { useDispatch } from "react-redux";
import { addProduct } from "../reducers/cartSlice";
import { axios } from "../axios";
import Suggestion from "../components/Suggestion";

function Book() {
    // return an object
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
        // scroll to top after reload page
        window.scrollTo({ top: 0, left: 0 });
        // eslint-disable-next-line
    }, [id]);

    const handleAddToCart = () => {
        dispatch(addProduct({ ...book, quantity }));
        navigate("/");
    };

    const handleBuyNow = () => {
        dispatch(addProduct({ ...book, quantity }));
        navigate("/payment");
    };

    const book_price_integer = Math.floor(book.price).toString();
    const book_price_fraction = (book.price - Math.floor(book.price))
        .toFixed(2)
        .substring(2);
    const numberFormat = new Intl.NumberFormat("en-US");
    const book_reviews = numberFormat.format(book.reviews);

    const ShoppingInfo = () => {
        return (
            <div className="flex flex-col sm:w-72 flex-none h-fit sm:border border-gray-300 rounded p-5 gap-5 text-sm mx-auto">
                <div className="flex flex-col space-y-5 sm: gap-5 sm:space-y-0">
                    <div className="flex justify-between">
                        <p className="my-auto text-base font-bold">
                            {book.quantity !==0 ? "In Stock" : "Currently unavailable"}
                        </p>
                        <p className="text-red-700 flex font-bold">
                            <span className="text-xs mt-1">$</span>
                            <span className=" text-xl">{book_price_integer}</span>
                            <span className="text-xs mt-1">{book_price_fraction}</span>
                        </p>
                    </div>
                    <p>FREE delivery {monthNames[month + 1]} 1 - 3 on your first order</p>
                    <p>Usually ships within 1 week.</p>
                    <div className="flex gap-2">
                        <div className="flex space-x-5">
                            <p className="my-auto text-base">Quantity: </p>
                            <select
                                className="border border-gray-400 rounded px-1"
                                onChange={(e) => setQuantity(e.target.value)}
                            >
                                {book.quantity > 0 &&
                                    Array.from({ length: book.quantity }, (_, num) => (
                                        <option key={num + 1} value={num + 1}>
                                            {num + 1}
                                        </option>
                                    ))}
                                {book.quantity === 0 &&
                                    <option value="0"> 0</option>
                                }
                            </select>
                        </div>
                    </div>
                    <button
                        className="text-sm text-center border border-yellow-500 bg-yellow-400 w-full py-1 rounded hover:bg-yellow-500 disabled:bg-gray-300 space-y-5"
                        disabled={book.quantity !==0 ? false : true}
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </button>

                    <button
                        className="text-sm text-center border border-yellow-500 bg-orange-400 w-full py-1 rounded hover:bg-orange-500 disabled:bg-gray-300 space-y-5"
                        disabled={book.quantity !==0 ? false : true}
                        onClick={handleBuyNow}
                    >
                        Buy now
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col gap-10 m-10 w-4/5 mx-auto text-sm sm:text-base">
            {/* First row on the page */}
            <p className="text-[#005e80]">
                <Link to="/">&lt; back to result</Link>
            </p>

            {/* Second row on the page */}
            <div className="flex justify-between flex-wrap gap-10">
                <img
                    className="w-4/5 sm:w-48 md:w-60 lg:w-72 h-fit object-contain mx-auto"
                    src={book.image}
                    alt=""
                />
                {ShoppingInfo()}
            </div>

            {/* Third row on the page - book info*/}
            <div className="flex flex-col gap-2">
                <p className="text-lg sm:text-3xl">{book.name}</p>
                <p className="sm:text-2xl text-gray-600">Paperback</p>
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
                    <p className="sm:text-sm text-sky-800">{book_reviews} ratings</p>
                </div>
                <p>{book.description}</p>
            </div>

            {/* The forth row on the page */}
            <div className="">
                <Suggestion selectedBook={book} />
            </div>
        </div>
    );
}

export default Book;
