import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ArrowDropDownTwoToneIcon from "@material-ui/icons/ArrowDropDownTwoTone";
import { Link } from "react-router-dom";


function Header({ department }) {

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

    // <div className="flex gap-5 bg-[#010b18] text-white px-3" >
    //   {/* Logo */}
    //   <div className="my-4 ml-2">
    //       <Link to="/">
    //             <p className="text-2xl font-extrabold font-serif text-amber-50">BookStore</p>
    //     </Link>
    //   </div>

    //   {/* Search bar */}
    //   <div className="grow flex flex-row h-10 my-auto max-w-7xl">
    //     <div className="py-2 border-gray-100 border-l rounded-l-xl  border-t border-b bg-gray-100 text-black">
    //       <span className="pl-3 pr-1">{department}</span>
    //       <ArrowDropDownTwoToneIcon />
    //     </div>
    //     <input className="grow p-3 border py-0 text-black" type="text" />
    //     <span className="py-2 px-3 border-amber-400 rounded-r-xl border-t border-r border-b bg-amber-400 text-black">
    //       <SearchIcon />
    //     </span>
    //   </div>

    //   {/* country
    //   <div className="mx-3 pt-4">
    //     <img
    //       className="object-scale-down max-w-5 max-h-5 pr-2 inline-flex"
    //       src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Canada_%28Pantone%29.svg/255px-Flag_of_Canada_%28Pantone%29.svg.png"
    //       alt=""
    //     />
    //     <ArrowDropDownTwoToneIcon />
    //   </div> */}

    //   <div>
    //     <span>Login</span>
    //   </div>
    
    //     <div>
    //       <span>Sigh Up</span>
    //     </div>
      

    //     {/* <div className="mx-3 py-2 flex flex-col active: text-white">
    //       <span>Return</span>
    //       <span>& Orders</span>
    //     </div> */}
     

    //   {/* shoppingcart */}
     
    //     <div className="active: text-white">
    //       <ShoppingCartIcon />
    //       <span></span>
    //     </div>
    // </div>
  );
}

export default Header;
