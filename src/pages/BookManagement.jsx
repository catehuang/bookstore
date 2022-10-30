import React, { useEffect, useState } from "react";
import { GetAllBooks } from "../api/book";
import BookInfo from "../components/BookInfo";

function BookManagement() {
    const [books, setBooks] = useState([]);
    const [windowNewABook, setWindowNewABook] = useState(false);
    const [windowViewAllBooks, setWindowViewAllBooks] = useState(true);

    useEffect(() => {
        GetAllBooks().then((result) => setBooks(result));
    }, [windowViewAllBooks]);

    const showAllBooks = () => {
        setWindowNewABook(false);
        setWindowViewAllBooks(true);
    };

    const showAnEmptyBook = () => {
        setWindowNewABook(true);
        setWindowViewAllBooks(false);
    };

    return (
        <div className="bg-sky-50 my-0">
            <div className="w-3/4 mx-auto py-10">
                <div className="flex gap-x-10">
                    <button onClick={showAllBooks}>
                        <input type="radio" className="hidden" id="btn_view_all_books" name="book_entry" defaultChecked/>
                        <label htmlFor="btn_view_all_books" className="border rounded px-5 py-1 bg-white border-sky-700 text-sky-700 hover:bg-sky-700 hover:text-sky-50 ">VIEW</label>                       
                    </button>

                    <button onClick={showAnEmptyBook}>
                        <input type="radio" className="hidden" name="book_entry" id="btn_new_a_book"/>
                        <label htmlFor="btn_new_a_book" className="border rounded px-5 py-1 bg-white border-sky-700 text-sky-700 hover:bg-sky-700 hover:text-sky-50 ">ADD</label>                       
                    </button>
                </div>

                <div>{windowNewABook ? <BookInfo book="" /> : null}</div>

                <div>
                    {windowViewAllBooks
                        ? books.map((book) => <BookInfo key={book._id} book={book} />)
                        : null}
                </div>
            </div>
        </div>
    );
}

export default BookManagement;
