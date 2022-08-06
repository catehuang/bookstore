import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axios } from "../axios";
import { Rating } from "@mui/material";

function Suggestion({ selectedBook }) {
        const [books, setBooks] = useState([]);
        const numberFormat = new Intl.NumberFormat("en-US");
        const book_reviews = numberFormat.format(selectedBook.reviews);

        useEffect(() => {
                const getBooks = async () => {
                        try {
                                // the data set formed in arrays
                                const response = await axios.get(`/books`);
                                setBooks(response.data);
                        } catch (error) {
                                console.log(error.message);
                        }
                };
                getBooks();
        }, []);

        return (
                <div className="flex overflow-x-auto gap-10 border border-gray-300 rounded-lg p-5 pb-0 h-fit">
                        {books
                                .filter((book) => book._id !== selectedBook._id)
                                .map(book => (
                                        
                                        <div className="text-sm" key={book._id}>
                                                <Link to={`/books/` + book._id}>
                                                <img
                                                        className="object-contain h-52 w-52 mx-auto"
                                                        src={book.image}
                                                        alt=""
                                                />
                                                <div className="grid grid-rows-2 px-3 gap-2">
                                                        <p className="line-clamp-2">{book.name}</p>
                
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
                                                                <span>{book_reviews}</span>
                                                        </div>
                                                </div>
                                                </Link>
                                        </div>
                                ))}
                </div>
        );
}

export default Suggestion;
