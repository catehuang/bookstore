import React from 'react';
import { useSelector } from "react-redux";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CurrencyFormat from 'react-currency-format';
import { useNavigate } from 'react-router-dom';

function Subtotal() {
        const cart = useSelector((state) => state.cart.products.length);
        const total = useSelector((state) => state.cart.total);
        const navigate = useNavigate();

        return (
                <div className="w-80 h-fit p-10 invisible lg:visible bg-white rounded-lg flex flex-col gap-5">
                        <div className="flex text-xs gap-2">
                                <span className="text-green-700"><CheckCircleIcon /></span>
                                <p>Your order qualifies for FREE shipping (excludes remote locations). Choose this option at checkout. Details</p>
                        </div>

                        <CurrencyFormat
                                renderText={(value) => (
                                        <div className="text-lg flex flex-col gap-3">
                                                <div className="flex justify-between">
                                                        <p className="">Subtotal ({cart} items):</p>
                                                        <p className="font-bold">{value}</p>
                                                </div>
                                                <p className="text-sm">
                                                        <input type="checkbox" /> This order contains a gift
                                                </p>

                                                {value !== '$0.00' &&
                                                        <button className="text-sm border border-yellow-300 bg-amber-200 w-full py-1 rounded hover:bg-amber-300" onClick={e => navigate('/payment')}>
                                                                Proceed to Checkout
                                                        </button>
                                                }

                                                {value === '$0.00' &&
                                                        <p className="text-sm text-center border border-gray-200 bg-gray-300 w-full py-2 rounded">
                                                                Proceed to Checkout
                                                        </p>
                                                }
                                        </div>
                                )}
                                decimalScale={2}
                                fixedDecimalScale={true}
                                value={total}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                        />
                </div>
        )
}

export default Subtotal
