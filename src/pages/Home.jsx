import React, { useEffect, useState } from 'react';
import Books from '../components/Book';
import { publicRequest } from '../publicRequest';

function Home() {
        const [ books, setBooks ] = useState([]);

        useEffect(() => {
                const getBooks = async () => {
                        try {
                                // the data set formed in arrays
                                const response = await publicRequest.get(`/books`);
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
  return (
    <div className="w-full">
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
