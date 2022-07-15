import React from 'react';
import { Link } from "react-router-dom";

function Product_Books({ book }) {
        const book_price_integer = Math.floor(book.price);
        const book_price_fraction = (book.price - Math.floor(book.price)).toFixed(2).substring(2);
        const numberFormat = new Intl.NumberFormat('en-US');
        const book_reviews = numberFormat.format(book.reviews);
        
        return (
                <Link to={`/book/`+book.id}>
                <div className="mx-auto pt-3 w-60 bg-gray-100 py-5 rounded">
                        <img className="object-contain h-52 w-52 mx-auto" src={book.image} alt="" />
                        <div className="grid grid-rows-2 mb-3 px-3">
                                <p className="pt-4">
                                        <span className="align-top">$</span>
                                        <span className="text-xl font-bold">{book_price_integer}</span>
                                        <span className="align-top">{book_price_fraction}</span>
                                </p>

                                <p className="line-clamp-2 h-12">{book.name}</p>

                                <div className="">
                                        <div className="text-amber-500 inline pr-2">
                                                {Array(Math.floor(book.stars))
                                                        .fill()
                                                        .map((_, i) => (
                                                                <span key={i}>&#9733;</span>
                                                        ))}
                                        </div>
                                        <span className="text-sm">{book_reviews}</span>
                                </div>
                        </div>
                        {/* <button className="text-sm text-center border-yellow-500 bg-amber-200 w-full py-1 rounded hover:bg-amber-300">Add to Cart</button>    */}
                </div>
                </Link>

        )
}

export default Product_Books;
