import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Header from "../components/Header";
import Books_Nav from "../components/Navigator_Books";
import Footer from "../components/Footer";
import Product_Books from '../components/Book';
//import data from "../data";

function Home() {
        //const [ books, setBooks ] = useState([]);
        const productList = useSelector(state => state.productList);
        const { products, loading, error } = productList;
        const dispatch = useDispatch();

        useEffect(() => {
                // const fetchData = async () => {
                //         const  { data }  = await axios.get(`/api/books`);
                //         setBooks(data);
                // }
                //fetchData();
                dispatchEvent(listProducts())

                

                return () => {
                       
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
                                products.map((product) =>
                                        <Product_Books key={product.id} />)
                        }
                </main>
                <footer><Footer /></footer>
    </div>
  )
}

export default Home
