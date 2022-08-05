import React, { useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Badge from "@mui/material/Badge";
import { logoutCart, clearCart } from "../reducers/cartSlice";
import { UserLogout } from "../api/user";
import { logout } from "../reducers/userSlice";
import { UpdateCart } from "../api/cart";
import { axios } from "../axios";


function Header() {
    const user = useSelector(state => state.user.currentUser);
    const cart = useSelector(state => state.cart);
    const [books, setBooks] = useState([]);
    const [searchString, setSearchString] = useState("");
    const quantity = cart.quantity;
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const getBooks = async () => {
            const response = await axios.get(`/books`);
            setBooks(response.data);
        }
        getBooks();
    }, []);

    useEffect(() => {
        if (user) {
            UpdateCart({ cart, user });
        }
    },[cart]);

    const handleLogout = () => {
        try {
            UserLogout();
        } catch (err) {
            console.log(err);
        }
        dispatch(logout());
        dispatch(logoutCart());
        dispatch(clearCart());
    };

    const handleSearch = (str) => {
        setSearchString(str.replace(/[^0-9a-z]/gi, ''));
        setIsOpen(true);
    }

    const handleClickSearch = (bookId) => {
        setSearchString("");
        setIsOpen(false);
        navigate(`/books/${bookId}`);
    }

    return (
        <div className="px-10 py-3 bg-[#00131a] text-gray-200">
            <div className="flex gap-10">
                <div className="text-xl first-letter:font-bold">
                    <Link to="/">BookStore</Link>
                </div>
                <div className="mx-auto grow">
                    <div className="flex">
                        <input type="text" className="rounded-l-lg text-[#00131a] px-2" value={searchString} onChange={(e) => handleSearch(e.target.value)} />
                        <p className="border-t border-r border-b rounded-r-lg px-1 bg-amber-400 border-none text-[#00131a]">
                            <SearchIcon />
                        </p>
                    </div>
                </div>

                <div>
                    {user ? (
                        <p>Hi, {user.username}</p>
                    ) : (
                        <Link to="/login">
                            <p>Login</p>
                        </Link>
                    )}
                </div>

                {user && (
                    <Link to="/orders">
                        <p>Orders</p>
                    </Link>
                )}

                <div className="flex-none">
                    {user ? (
                        <button onClick={handleLogout}>Logout</button>
                    ) : (
                        <Link to="/register">
                            <p>Sign up</p>
                        </Link>
                    )}
                </div>
                <div className="text-2xs flex-none flex">
                    <Link to="checkout">
                        <Badge badgeContent={`${quantity}`} color="error">
                            <ShoppingCartIcon />
                        </Badge>
                    </Link>
                </div>
            </div>

            {/* search result */}
            { 
                isOpen && 
                (
                    <div className="bg-white ml-32 w-fit px-2 rounded text-black text-sm flex flex-col gap-2 absolute z-50">
                    {  
                        searchString === '' ? setIsOpen(false) :
                        (
                            books.filter(book => {
                                if (book.name.toLowerCase().includes(searchString.toLowerCase()))
                                    return book;
                                }).map(book => (
                                    <p className="flex-wrap " key={book._id} onClick={() => handleClickSearch(`${book._id}`)}>
                                        <span className="cursor-pointer">{book.name}</span>
                                    </p>
                                ))                            
                        )  
                    }
                    </div>
                )
            }
        </div>
    );
}

export default Header;
