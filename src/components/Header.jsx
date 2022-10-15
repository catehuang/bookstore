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
import { ContactPageOutlined } from "@mui/icons-material";

function Header() {
    const user = useSelector((state) => state.user.currentUser);
    const cart = useSelector((state) => state.cart);
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
        };
        getBooks();
        console.log(cart);
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
        setSearchString(str.replace(/[^0-9a-z]/gi, ""));
        setIsOpen(true);
    };

    const handleClickSearch = (bookId) => {
        setSearchString("");
        setIsOpen(false);
        navigate(`/books/${bookId}`);
    };

    const SearchResult = () => {
        return (
            <div className="w-4/5 md:w-1/3 bg-white mt-5 px-2 rounded text-gray-700 border border-gray-200 rouned-lg text-sm flex flex-col gap-2 absolute z-50 ">
                {searchString === ""
                    ? setIsOpen(false)
                    : books
                        .filter((book) => {
                            if (
                                book.name.toLowerCase().includes(searchString.toLowerCase())
                            )
                                return book;
                            else return null;
                        })
                        ?.map((book) => (
                            <p
                                className="flex-wrap "
                                key={book._id}
                                onClick={() => handleClickSearch(`${book._id}`)}
                            >
                                <span className="cursor-pointer line-clamp-1">
                                    {book.name}
                                </span>
                            </p>
                        ))}
            </div>
        );
    };

    const SearchBar = () => {
        return (
            <div id="searchBar" className="">
                <div className="flex">
                    <input
                        type="text"
                        className="rounded-none rounded-l  text-[#00131a] px-2 w-full md:w-52"
                        value={searchString}
                        onChange={(e) => handleSearch(e.target.value)}
                        onBlur={(e) => setIsOpen(false)}
                    />
                    <p className="border border-amber-400 rounded-r bg-amber-400 text-[#00131a] px-1">
                        <SearchIcon />
                    </p>
                </div>
                <div id="searchResult">{isOpen && <SearchResult />}</div>
            </div>
        );
    };

    return (
        <div className="bg-[#00131a] text-gray-200 px-10 py-5 flex flex-wrap">
            <div id="bookstorte_searchBar" className="flex space-x-10">
                <div className="text-xl first-letter:font-bold">
                    <Link to="/">BookStore</Link>
                </div>
                <div className="hidden md:block">{SearchBar()}</div>
            </div>
            <div id="userInfo" className="flex ml-auto space-x-5 md:space-x-10 my-auto">
                <div id="login_username" className="">
                    {user ? (
                        <p>Hi, {user.username}</p>
                    ) : (
                        <Link to="/login">
                            <p>Login</p>
                        </Link>
                    )}
                </div>

                <div id="order" className="">
                    {user && (
                        <Link to="/orders">
                            <p>Orders</p>
                        </Link>
                    )}
                </div>

                <div id="logout" className="">
                    {user ? (
                        <button onClick={handleLogout}>Logout</button>
                    ) : (
                        <Link to="/register">
                            <p>Sign up</p>
                        </Link>
                    )}
                </div>

                <div id="cart" className="text-2xs">
                    <Link to="checkout">
                        <Badge badgeContent={`${quantity}`} color="error">
                            <ShoppingCartIcon />
                        </Badge>
                    </Link>
                </div>
            </div>
            <div className="md:hidden w-full mt-5">{SearchBar()}</div>
        </div>
    );
}

export default Header;
