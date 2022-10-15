import React, { useEffect, useState } from 'react';
import Books from '../components/Book';
import { axios } from "../axios";
import Banner from '../components/Banner';

function Home() {
        const [books, setBooks] = useState([]);

        useEffect(() => {
                const getBooks = async () => {
                        try {
                                // the data set formed in arrays
                                const response = await axios.get(`/books`);
                                setBooks(response.data);
                        }
                        catch (error) {
                                console.log(error.message);
                        }
                }
                getBooks();
        }, [])

        return (
                <div className="bg-gray-100">
                        <div className="">
                                <Banner />
                        </div>
                        <div className="mx-auto">
                                <div className="bg-gray-100 py-5">
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 1xl:grid-cols-7 ">
                                                {
                                                        books.map(book =>
                                                                <Books key={book._id} book={book}/>)
                                                }
                                        </div>
                                </div>
                        </div>
                </div>
        )
}

export default Home
