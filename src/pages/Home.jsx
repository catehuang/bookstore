import React, { useEffect, useState } from "react";
import Books from "../components/Book";
import Banner from "../components/Banner";
import { getAllBooks } from "../api/book";

function Home() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        getAllBooks().then((result) => setBooks(result));
    }, []);

    return (
        <div className="bg-gray-100">
            <div className="">
                <Banner />
            </div>
            <div className="mx-auto">
                <div className="bg-gray-100 py-5">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 1xl:grid-cols-7 ">
                        {books.map((book) => (
                            <Books key={book._id} book={book} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
