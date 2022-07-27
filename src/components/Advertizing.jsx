import React from "react";

function Advertizing() {
        return (
                <div className="flex mx-auto gap-10 justify-evenly bg-white p-5 rounded-lg">
                        <img
                                className="w-24"
                                src="https://images-na.ssl-images-amazon.com/images/G/15/credit/img19/CBCC/detailpage/DP-Desktop-HeaderHand_NP-Unrec._CB466933401_.png"
                                alt=""
                        />
                        <div className="my-auto">
                                <span>You can get </span>
                                <span className="text-cyan-700">5% back at BookStore </span>
                                <span>for 6 months upon approval for the </span>
                                <span className="font-bold">BookStore Rewards Mastercard. </span>
                                <span>
                                        Welcome offer on first $3,000 in eligible purchase. See terms.{" "}
                                </span>
                        </div>
                        <div className="my-auto flex-none">
                                <p className="border py-1 px-4 rounded-lg bg-gray-300 text-sm">
                                        Learn more
                                </p>
                        </div>
                </div>
        );
}

export default Advertizing;
