import React, { useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Badge from '@mui/material/Badge';
import { logoutCart, clearCart } from '../reducers/cartSlice';
import { logout } from "../reducers/userSlice";
import { UserLogout } from '../api/user';

function Header() {
  const user= useSelector(state => state.user.currentUser);
  const cart = useSelector((state) => state.cart.quantity);
  const dispatch = useDispatch();
 
  const handleLogout = () => {
    try {
      UserLogout();
    // dispatch(logoutOrder());
    //console.log("logout successfully")
    } catch (err)
    {
      console.log(err);
    }
    dispatch(logout());
    dispatch(logoutCart());
    dispatch(clearCart());
  }


  return (
    <div className="px-10 py-3 bg-[#00131a] text-gray-200">
      <div className="flex gap-10">
        <div className="text-xl first-letter:font-bold">
          <Link to="/">BookStore</Link>
        </div>
        <div className="mx-auto grow">
          <div className="flex">
            <input type="text" className="rounded-l-lg text-[#00131a] px-2" />
            <p className="border-t border-r border-b rounded-r-lg px-1 bg-amber-400 border-none text-[#00131a]">
              <SearchIcon />
            </p>
          </div>
        </div>
        <div className="">
          <div>
            {user ? (
              <p>Hi, {user.username}</p>
            ) : (
              <Link to="/login">
                <p>Login</p>
              </Link>
            )}
          </div>
        </div>
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
            <Badge badgeContent={ `${cart}` } color="error">
              <ShoppingCartIcon />
            </Badge>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
