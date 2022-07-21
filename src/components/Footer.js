import React from "react";

function Footer() {
  return (
    <div className="mx-auto bg-[#002533] text-gray-200">
      <div className="bg-[#005e80] text-center">
        <a href="#top">
          <p className="active: text-gray-200 p-2 text-sm">Back to top</p>
        </a>
      </div>
      <div className="w-2/3 mx-auto mt-5 flex justify-between text-sm">
        <div className="flex flex-col gap-1">
          <p className="text-base py-1 font-bold">Get to Know Us</p>
          <p>Careers</p>
          <p>BookStore and Our Planet</p>
          <p>Investor</p>
          <p>Press Release</p>
          <p>BookStore Science</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-base py-1 font-bold">Make Money with Us</p>
          <p>Sell on BookStore</p>
          <p>Sell on BookStore Handmade</p>
          <p>advertise Your Products</p>
          <p>Independently Publish with Us</p>
          <p>Host an BookStore Hub</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-base py-1 font-bold">BookStore Payment Products</p>
          <p>BookStore.ca Rewards Mastercard</p>
          <p>Shop with Points</p>
          <p>Reload Your balance</p>
          <p>BookStore Currency Converter</p>
          <p>Gift Cards</p>
          <p>BookStore Cash</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-base py-1 font-bold">Let Us Help You</p>
          <p>COVID-19 and BookStore</p>
          <p>Shipping Rates & Policies</p>
          <p>BookStore Prime</p>
          <p>Returns Are Easy</p>
          <p>Manage your Content and Devices</p>
          <p>Customer Service</p>
        </div>
      </div>
      <div className="mt-3 bg-[#00131a]">
        <div className="w-2/5 mx-auto flex justify-between flex-row py-2 text-sm">
          <p>Condition of Use</p>
          <p>Privacy Notice</p>
          <p>Help</p>
          <p>&copy; 2022, BookStore Inc. of its affiliates</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
