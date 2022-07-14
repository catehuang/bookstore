import React, { useState } from "react";
import Close from '@material-ui/icons/Close';
import PersonIcon from '@material-ui/icons/Person';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

function Nav_Books() {
        const [isOpen, setIsOpen] = useState(false);

        const ToggleSidebar = () => {
                isOpen === true ? setIsOpen(false) : setIsOpen(true);
        };

        return (
                <div className="flex flex-row justify-between px-3 py-1 text-sm bg-gray-50 border border-b-gray-200">
                        <ul className="flex gap-2">
                                <li className="font-bold">
                                        <button onClick={ToggleSidebar}>&#9776;</button>
                                </li>
                                <li>Advanced Search</li>
                                <li>Today's Deals</li>
                                <li>New Releases</li>
                                <li>Amazon Chart</li>
                                <li>Best Sellers & More</li>
                                <li className="hidden lg:inline-block">
                                        The Globe & Mail Best Sellers
                                </li>
                                <li className="hidden md:inline-block">New York Times Best Sellers</li>
                                <li className="hidden xl:inline-block">Best Books of the Month</li>
                                <li className="hidden xl:inline-block">Children's Books</li>
                                <li className="hidden 2xl:inline-block">Textbooks</li>
                                <li className="hidden 2xl:inline-block">Kindle Books</li>
                        </ul>
                        {isOpen === true && (
                                <div className="fixed w-80 h-screen left-0 top-16 border-r border-b bg-white rounded text-gray-800">
                                        <div className="flex justify-between bg-[#162a42] text-white text-xl px-5 py-3">
                                                <div className="flex gap-2">
                                                        <PersonIcon />
                                                        <p className="font-bold">Hello, Sign in</p>
                                                </div>
                                                <button onClick={ToggleSidebar}><Close /></button>
                                        </div>

                                        <button className="px-5 py-3 font-bold"><ArrowBackIcon  /><p className="inline pl-1">MAIN MENU</p></button>

                                        <div className="border-t border-gray-300">
                                                <p className="text-lg font-bold px-5 py-3">Books</p>
                                                <ul className="px-5 pb-5 leading-8">
                                                        <li>Comics & Graphic Novels</li>
                                                        <li>Science & Math</li>
                                                        <li>Textbooks</li>
                                                        <li>Children's Books</li>
                                                        <li>Professional & Technical</li>
                                                        <li>Eduaction & Reference</li>
                                                        <li>Politics & Socail Sciences</li>
                                                        <li>Arts & Photography</li>
                                                </ul>
                                        </div>
                                </div>
                        )}
                </div>
        );
}

export default Nav_Books;
