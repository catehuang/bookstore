import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LockIcon from "@material-ui/icons/Lock";
import { Link } from "react-router-dom";
import { publicRequest } from "../publicRequest";
import { Rating } from "@mui/material";

function Book() {
        // return an object
        const { id } = useParams();
        const [book, setBook] = useState([]);
        useEffect(() => {
                const getBook = async () => {
                        try {
                                const response = await publicRequest.get(`/books/find/${id}`);
                                setBook(response.data);
                        } catch (error) {
                                console.log(error.message);
                        }
                };
                getBook();
        }, []);

        const book_price_integer = Math.floor(book.price);
        const book_price_fraction = (book.price - Math.floor(book.price))
                .toFixed(2)
                .substring(2);
        const numberFormat = new Intl.NumberFormat("en-US");
        const book_reviews = numberFormat.format(book.reviews);
        const obj = {
                array: [],
        };

        for (var i = 0; i < book.quantity; i++) obj.array[i] = i + 1;

        return (
                <div>
                        <Link to="/">
                                <p className="py-5 px-10 text-[#005e80]"> &lt; back to result</p>
                        </Link>
                        {
                                <div className="flex flex-col gap-5 mx-auto px-10 py-5">
                                        <div className="flex gap-5">
                                                <img
                                                        className="object-contain w-60 h-fit"
                                                        src={book.image}
                                                        alt=""
                                                />
                                                <div className="flex flex-col w-1/2 grow gap-2">
                                                        <p className="text-3xl">{book.name}</p>
                                                        <p className="text-2xl text-gray-600">Paperback</p>
                                                        <p>
                                                                by<span className="text-sky-800  px-1">{book.author}</span>
                                                                (Author)
                                                        </p>

                                                        <div className="text-amber-500 flex gap-2">
                                                                {/* {Array((book.stars))
                                                                        .fill()
                                                                        .map((_, i) => (
                                                                                <span key={i}>&#9733;</span>
                                                                        ))} */}
                                                                <p>
                                                                        <Rating
                                                                                value={ `${book.stars}` }
                                                                                precision={0.5}
                                                                                size="small"
                                                                                readOnly
                                                                        />
                                                                </p>

                                                                <p className="text-sm text-sky-800">{book_reviews} ratings</p>
                                                        </div>
                                                        <p>{book.description}</p>
                                                </div>

                                                <div className="invisible lg:visible flex flex-col w-80 h-fit border border-gray-300 rounded p-5 gap-3 text-sm">
                                                        <div className="flex justify-between">
                                                                <p className="font-bold text-base">Buy new</p>
                                                                <p className="text-red-700  flex font-bold">
                                                                        <span className="text-xs mt-1">$</span>
                                                                        <span className=" text-xl">{book_price_integer}</span>
                                                                        <span className="text-xs mt-1">{book_price_fraction}</span>
                                                                </p>
                                                        </div>
                                                        <p className="text-sm">
                                                                <span className="text-sky-800 font-bold">FREE delivery </span>
                                                                <span className=" font-bold">Tuesday, July 19 </span>on your
                                                                first order.{" "}
                                                                <span className="text-sky-800 font-bold">Details</span>
                                                        </p>
                                                        <p className="text-lg text-green-700 font-bold">In Stcok.</p>
                                                        <p className="text-sm">
                                                                As an alternative, the{" "}
                                                                <span className="text-sky-800 font-bold">Kindle eBook </span>is
                                                                available now and can be read on any device with the free Kindle
                                                                app. Want to Listen?{" "}
                                                                <span className="text-sky-800 font-bold">Try Audible.</span>
                                                        </p>
                                                        <div className="flex">
                                                                <p className="pr-2">Quantity: </p>
                                                                <select
                                                                        id="quantity"
                                                                        className="border border-gray-400 rounded"
                                                                >
                                                                        {obj.array.map((num) => (
                                                                                <option key={num} value={num}>
                                                                                        {num}
                                                                                </option>
                                                                        ))}
                                                                        ;
                                                                </select>
                                                        </div>
                                                        <button className="text-sm text-center border-yellow-500 bg-yellow-400 w-full py-1 rounded hover:bg-yellow-500">
                                                                Add to Cart
                                                        </button>
                                                        <div className="flex text-gray-500 gap-3">
                                                                <LockIcon />
                                                                <p className="text-sky-800 font-bold">Secure transaction</p>
                                                        </div>
                                                        <p>Ships from and sold by Amazon.ca.</p>
                                                        <div className="flex gap-2">
                                                                <input type="checkbox" />
                                                                <p>Add gift options</p>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        }
                </div>
        );
}

export default Book;
