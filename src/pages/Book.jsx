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
            <div className="flex flex-col w-fit md:w-60 mx-auto bg-gray-100 border border-gray-200 rounded-lg p-5 text-sm">
                <div className="flex flex-col space-y-3">
                    <div className="flex">
                        <p className="my-auto text-base font-bold">
                            {book.quantity !== 0 ? "In Stock" : "Currently unavailable"}
                        </p>
                        <p className="text-red-700 flex font-bold mr-0 ml-auto">
                            <span className="text-xs mt-1">$</span>
                            <span className=" text-xl">{book_price_integer}</span>
                            <span className="text-xs mt-1">{book_price_fraction}</span>
                        </p>
                    </div>
                    <p>FREE delivery {monthNames[month + 1]} 1 - 3 on your first order</p>
                    <p>Usually ships within 1 week.</p>

                    <div className="flex">
                        <div className="flex space-x-3">
                            <p className="my-auto">Quantity: </p>
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
                                {book.quantity === 0 && <option value="0"> 0</option>}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col space-y-3 my-5">
                    <button
                        className="text-center border border-yellow-500 bg-yellow-400 w-full py-1 rounded hover:bg-yellow-500 disabled:bg-gray-300 space-y-5"
                        disabled={book.quantity !== 0 ? false : true}
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </button>

                    <button
                        className="text-center border border-yellow-500 bg-orange-400 w-full py-1 rounded hover:bg-orange-500 disabled:bg-gray-300 space-y-5"
                        disabled={book.quantity !== 0 ? false : true}
                        onClick={handleBuyNow}
                    >
                        Buy now
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="container mx-auto">
            <div className="flex flex-col space-y-5 m-5">
                {/* First row on the page */}
                <p className="text-[#005e80]">
                    <Link to="/">&lt; back to result</Link>
                </p>

                {/* Second row on the page */}
                <div className="flex">
                    <img
                        className="object-contain max-h-80 my-auto mx-auto mb-8 md:mb-0"
                        src={book.image}
                        alt=""
                    />
                    <div className="mx-auto my-auto hidden md:block">{ShoppingInfo()}</div>
                </div>

                {/* Third row on the page - book info*/}
                <div className="flex flex-col gap-2 px-5">
                    <p className="text-2xl font-bold">{book.name}</p>
                    <div className="">
                        <p className="text-gray-600">Paperback</p>
                        <p>
                            by<span className="text-sky-800  px-1">{book.author}</span>
                            (Author)
                        </p>
                    </div>

                    <div className="text-amber-500 flex gap-2">
                        <p>
                            <Rating
                                value={Number(`${book.stars}`)}
                                precision={0.5}
                                size="small"
                                readOnly
                            />
                        </p>
                        <p className="text-sky-800">{book_reviews} ratings</p>
                    </div>
                    <p className="py-3 text-base">{book.description}</p>
                    <div className="mx-auto my-10  md:hidden">{ShoppingInfo()}</div>
                </div>
            </div>
            <div className="my-10 mx-10">
                <Suggestion selectedBook={book} />
            </div>
        </div>
    );
}

export default Book;
