import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Books from '../components/Book';
import { axios } from "../axios";
import Banner from '../components/Banner';
import { LoadCart } from '../api/cart';
import { UpdateCart } from "../api/cart";

function Home() {
        const [ books, setBooks ] = useState([]);
        const cart = useSelector(state => state.cart);
        const user = useSelector(state => state.user.currentUser)
        //const currentUser = useSelector(state => state.user.currentUser );

        useEffect(() => {
                const getBooks = async () => {
                        try {
                                // the data set formed in arrays
                                const response = await axios.get(`/books`);
                                //console.log(response);
                                setBooks(response.data);
                        }
                        catch (error)
                        {
                               console.log(error.message);
                        }
                }
                getBooks();

        }, []);

        useEffect(() => {
                if (user)
                {
                        const token = user.accessToken;
                        UpdateCart({ cart, token });
                }                   
        }, [cart]);

        // useEffect(() => {
        //         if (currentUser)
        //         {
        //                 // console.log(currentUser);
        //                 LoadCart(currentUser);        
        //         }

        // }, [currentUser])



  return (
    <div className="w-full">
            <Banner />
                <main className='grid sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-5 xl:grid-cols-6  2xl:grid-cols-7 grid-flow-row gap-x-2 gap-y-10 py-10 px-auto'>
                        {
                                books.map(book =>
                                        <Books key={book._id} book={book}/>)
                        }
                </main>
    </div>
  )
}

export default Home
