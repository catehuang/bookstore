import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useNavigate } from "react-router-dom";
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
        // eslint-disable-next-line
    }, [cart, user]);

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
        <div className="px-3 sm:px-10 py-3 bg-[#00131a] text-gray-200">
            <div className="flex justify-between flex-wrap gap-5">
                <div className="flex flex-row justify-start gap-5 sm:gap-10">
                    <div className="text-xl first-letter:font-bold flex-none">
                        <Link to="/">BookStore</Link>
                    </div>
                    <div className="w-fit">
                        <div className="flex ">
                            <input type="text" className="rounded text-[#00131a] px-2 w-40 sm:w-52" value={searchString} onChange={(e) => handleSearch(e.target.value)} />
                            <p className="border-t border-r border-b rounded-r px-1 bg-amber-400 border-none text-[#00131a]">
                                <SearchIcon />
                            </p>
                        </div>
                    </div>
                </div>
  {/* search result */}
  {
                isOpen &&
                (
                    <div className="w-1/2 bg-white ml-32 mt-8 px-2 rounded text-gray-700 text-sm flex flex-col gap-2 absolute z-50 ">
                        {
                            searchString === '' ? setIsOpen(false) :
                                (
                                    books.filter(book => {
                                        if (book.name.toLowerCase().includes(searchString.toLowerCase()))
                                            return book;
                                        else
                                            return null;
                                    })?.map(book => (
                                        <p className="flex-wrap " key={book._id} onClick={() => handleClickSearch(`${book._id}`)}>
                                            <span className="cursor-pointer line-clamp-1">{book.name}</span>
                                        </p>
                                    ))
                                )
                        }
                    </div>
                )
            }
                <div className="flex flex-row justify-end gap-12">
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

            </div>
          
        </div>
    );
}

export default Header;
