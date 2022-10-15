import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";

function Product_Books({ book }) {
        const book_price_integer = Math.floor(book.price);
        const book_price_fraction = (book.price - Math.floor(book.price))
                .toFixed(2)
                .substring(2);
        const numberFormat = new Intl.NumberFormat("en-US");
        const book_reviews = numberFormat.format(book.reviews);

        return (
                        <div className="w-52 lg:w-60 my-5 md:mx-5 p-3 rounded-lg bg-white border border-gray-200">
                                <Link to={`/books/` + book._id}>
                                {
                                        book.quantity === 0 && (
                                                <div>
                                                        <p className="bg-gray-600 text-white px-1 w-fit absolute">SOLD OUT</p>
                                                </div>    
                                        )
                                }

                                <img
                                        className="object-contain w-40 lg:h-60 lg:w-60 mx-auto mt-3"
                                        src={book.image}
                                        alt=""
                                />
                                <div className="grid grid-rows-2 mb-3 px-3 gap-2">
                                        <p className="pt-4">
                                                <span className="align-top">$</span>
                                                <span className="text-xl font-bold">{book_price_integer}</span>
                                                <span className="align-top">{book_price_fraction}</span>
                                        </p>

                                        <p className="line-clamp-2 h-12">{book.name}</p>

                                        <div className="flex gap-2">
                                                <div className="text-amber-500">
                                                        <Rating
                                                                name="text-feedback"
                                                                value={Number(`${book.stars}`)}
                                                                readOnly
                                                                precision={0.5}
                                                                size="small"
                                                        />
                                                </div>
                                                <span className="text-sm">{book_reviews}</span>
                                        </div>
                                </div>
                                </Link>
                        </div>
        );
}

export default Product_Books;
