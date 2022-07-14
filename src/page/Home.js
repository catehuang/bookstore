import React from 'react';
import Header from "../component/Header";
import Books_Nav from "../component/Navigator_Books";
import Footer from "../component/Footer";
import data from "../data";
import Product_Books from '../component/Book';

function Home() {
  return (
    <div className="h-screen w-full">
                <header>
                        <Header department="Books"/>
                        <Books_Nav />
                </header>

                <main className='grid sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-5 xl:grid-cols-6  2xl:grid-cols-7 grid-flow-row gap-x-2 gap-y-10 py-10 px-auto'>
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
