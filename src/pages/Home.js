import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Books_Nav from "../components/Navigator_Books";
import Footer from "../components/Footer";
//import data from "../data";
import Product_Books from '../components/Book';
import axios from 'axios';

function Home() {
        const [ books, setBooks ] = useState([]);
        useEffect(() => {
                const fetchData = async () => {
                        const  { data }  = await axios.get("/api/books");
                        setBooks(data);
                }
                fetchData();
                return () => {
                //
                };
        }, []);
  return (
    <div className="h-screen w-full">
                <header>
                        <Header department="Books"/>
                        <Books_Nav />
                </header>

                <main className='grid sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-5 xl:grid-cols-6  2xl:grid-cols-7 grid-flow-row gap-x-2 gap-y-10 py-10 px-auto'>
                        {
                                books.map(book =>
                                        <Product_Books book={book} key={book.id} />)
                        }
                </main>
                <footer><Footer /></footer>
    </div>
  )
}

export default Home
