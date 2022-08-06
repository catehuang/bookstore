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
                <Link to={`/books/` + book._id}>
                        <div className="mx-auto pt-3 w-60 bg-gray-100 py-5 rounded">
                                <img
                                        className="object-contain h-52 w-52 mx-auto"
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
                        </div>
                </Link>
        );
}

export default Product_Books;
