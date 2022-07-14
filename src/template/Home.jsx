import React from 'react';
import Header from "./Header";
import Books_Nav from "./Books_Nav";
import SubHeader from "./SubHeader";
import Footer from "./Footer";
import data from "../data";
import Product_Books from './Product_Books';

function Home() {
  return (
    <div className="h-screen">
                <header>
                        <Header department="Books"/>
                        <Books_Nav />
                </header>

                <main className='grid grid-cols-6 grid-flow-row gap-3'>
                        {
                                data.books.map(book =>
                                        <Product_Books book={book} key={book.id} />)
                        }
                </main>
                <footer><Footer /></footer>
    </div>
  )
}

export default Home
