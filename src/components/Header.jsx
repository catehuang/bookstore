import React, { useEffect, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Badge from "@mui/material/Badge";
import { logoutCart, clearCart } from "../reducers/cartSlice";
import { logout } from "../reducers/userSlice";
import { UpdateCart } from "../api/cart";
import SearchBar from "./SearchBar";
import { GetAllBooks } from "../api/book";

function Header() {
    const user = useSelector((state) => state.user.currentUser);
    const cart = useSelector((state) => state.cart);
    const [books, setBooks] = useState([]);
    const quantity = cart.quantity;
    const dispatch = useDispatch();

    // for search bar loading
    useEffect(() => {
        GetAllBooks().then((result) => setBooks(result));
    }, []);

    useEffect(() => {
        if (user) {
            UpdateCart({ cart, user });
        }
        // eslint-disable-next-line
    }, [cart, user]);

    const handleLogout = () => {
        dispatch(logout());
        dispatch(logoutCart());
        dispatch(clearCart());
    };

    return (
        <div className="bg-[#00131a] text-gray-200 px-10 py-5 flex flex-wrap">
            <div id="bookstore_searchBar" className="flex space-x-10">
                <div className="text-xl first-letter:font-bold">
                    <Link to="/">BookStore</Link>
                </div>
                <div id="searchBar_normal" className="hidden md:block">
                    <SearchBar books={books} />
                </div>
            </div>
            <div
                id="userInfo"
                className="flex ml-auto space-x-5 md:space-x-10 my-auto"
            >
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
            <div id="searchBar_mobile" className="md:hidden w-full mt-5">
                <SearchBar books={books} />
            </div>
        </div>
    );
}

export default Header;
