import React from 'react';
import { Link } from "react-router-dom";
import ArrowDropDownTwoToneIcon from "@material-ui/icons/ArrowDropDownTwoTone";

function SubHeader() {
        return (
                <div className="flex flex-row gap-4 py-2 px-5 bg-[#032349] text-white">
                        <div >
                                <span >
                                        <div>
                                                {/*Menu icon &#9776*/}
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                        </div>
                                        All
                                </span>
                        </div>                        
                        
                                <div className="active: text-yellow-300">Books</div>
                        
                        <div>Best Sellers</div>
                        <div>Deal Store</div>
                        <div>Customer Service</div>
                        <div>New Releases</div>
                        <div>
                                Prime <ArrowDropDownTwoToneIcon />
                        </div>
                        <div>Fashion</div>
                        <div>Sell</div>
                        <div className="hidden lg:inline-block">Electronics</div>
                        <div className="hidden lg:inline-block">Home</div>
                        <div className="hidden lg:inline-block">Amazon Outlet</div>
                        <div className="grow hidden xl:inline-block">Toys & Games</div>
                        <div className="hidden 2xl:inline-block">New deals everyday</div>
                </div>
        )
}

export default SubHeader;
