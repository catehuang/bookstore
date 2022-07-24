import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link } from "react-router-dom";


function Header() {

  return (
    <div className="px-5 py-3 bg-[#00131a] text-gray-200">
      <ul className="flex gap-10">
        <li className="text-xl first-letter:font-bold">
        <Link to="/">BookStore</Link>
        </li>
        <li className="mx-auto grow">
          <div className="flex">
            <input type="text" className="rounded-l-lg text-[#00131a] px-2" />
            <p className="border-t border-r border-b rounded-r-lg px-1 bg-amber-400 border-none text-[#00131a]"><SearchIcon /></p>
          </div>
        </li>
        <li className="">
          <Link to="/login">
              Login
          </Link>
          </li>
        <li className="flex-none">
          <Link to="./register">
             Sign Up
          </Link>
         </li>
        <li className="text-2xs">
        <ShoppingCartIcon/>
        </li>
      </ul>
    </div>
)}

export default Header;
