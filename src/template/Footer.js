import React from "react";

function Footer() {
  return (
    <div className="mx-auto bg-[#032349] text-gray-200">
      <div className="bg-[#294a69] text-center">
        <a href="#top">
          <p className="active: text-gray-200 p-2 text-sm">Back to top</p>
        </a>
      </div>
      <div className="w-2/3 mx-auto mt-5 flex justify-between text-sm">
        <div className="">
          <h5>Get to Know Us</h5>
          <p>Careers</p>
          <p>Amazon and Our Planet</p>
          <p>Investor</p>
          <p>Press Release</p>
          <p>Amazon Science</p>
        </div>
        <div className="">
          <h5>Make Money with Us</h5>
          <p>Sell on Amazon</p>
          <p>Sell on Amazon Handmade</p>
          <p>advertise Your Products</p>
          <p>Independently Publish with Us</p>
          <p>Host an Amazon Hub</p>
        </div>
        <div className="">
          <h5>Amazon Payment Products</h5>
          <p>Amazon.ca Rewards Mastercard</p>
          <p>Shop with Points</p>
          <p>Reload Your balance</p>
          <p>Amazon Currency Converter</p>
          <p>Gift Cards</p>
          <p>Amazon Cash</p>
        </div>
        <div className="">
          <h5>Let Us Help You</h5>
          <p>COVID-19 and Amazon</p>
          <p>Shipping Rates & Policies</p>
          <p>Amazon Prime</p>
          <p>Returns Are Easy</p>
          <p>Manage your Content and Devices</p>
          <p>Customer Service</p>
        </div>
      </div>
      <div className="mt-3 bg-[#010b18]">
        <div className="w-2/5 mx-auto flex justify-between flex-row py-2 text-sm">
          <p>Condition of Use</p>
          <p>Privacy Notice</p>
          <p>Help</p>
          <p>&copy; 1996-2022, Amazon FAKE CLONE, Inc. of its affiliates</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
