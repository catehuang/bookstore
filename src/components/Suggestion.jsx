import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axios } from "../axios";
import { Rating } from "@mui/material";

function Suggestion({ selectedBook }) {
        const [books, setBooks] = useState([]);
        // const numberFormat = new Intl.NumberFormat("en-US");
        // const book_reviews = new Intl.NumberFormat("en-US").format(selectedBook.reviews);

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

        const RenderBook = ({book}) => {
                return (
                        <div className="text-xs sm:text-sm p-2" key={book._id}>
                                <Link to={`/books/` + book._id}>
                                        <img
                                                className="object-contain h-36 w-36 sm:w-52 sm:h-52 mx-auto"
                                                src={book.image}
                                                alt=""
                                        />
                                        <div className="grid grid-rows-2 px-3 space-y-2 mt-2">
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
                                                        <span>{
                                                                new Intl.NumberFormat("en-US").format(`${book.reviews}`)
                                                        }</span>
                                                </div>
                                        </div>
                                </Link>
                        </div>
                );
        };

        return (
                <div className="flex overflow-x-auto space-x-5 border border-gray-300 rounded-lg py-5 pb-0 h-fit">
                        {selectedBook? books
                                .filter((book) => book._id !== selectedBook._id)
                                .map((book) => (
                                        <RenderBook book={book} key={book._id}/>
                                )) :
                                books.map((book) => (
                                        <RenderBook book={book} key={book._id}/>
                                )) 
                        }
                </div>
        );
}

export default Suggestion;
