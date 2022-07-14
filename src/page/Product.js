import React from "react";
import data from "../data";
import Header from "../component/Header";
import Navigator_Books from "../component/Navigator_Books";
import Footer from "../component/Footer";
import { useParams } from "react-router-dom";

function Product(props) {
        const { id } = useParams();
        // Doesn't work if you use ===
        const product = data.books.find(x => x.id == id);
        const product_price_integer = Math.floor(product.price);
        const product_price_fraction = (product.price - Math.floor(product.price)).toFixed(2).substring(2);
        const numberFormat = new Intl.NumberFormat('en-US');
        const product_reviews = numberFormat.format(product.reviews);

        return (
                <div>
                        <Header />
                        <Navigator_Books />
                        <div className="flex flex-col mx-auto p-20">
                                <div className="flex gap-10">
                                          <img className="object-contain w-60" src={product.image} alt="" />
                                          <div className="flex flex-col w-1/2">
                                                  <p className="text-3xl">{product.name}</p>
                                                  <p className="text-2xl text-gray-600">Paperback</p>
                                                  <p>by<span className="text-cyan-700 px-1">{product.author}</span>(Author)
                                                </p>
                                                <div className="text-amber-500 inline pr-2">
                                                        {Array(Math.floor(product.stars))
                                                                .fill()
                                                                .map((_, i) => (
                                                                        <span key={i}>&#9733;</span>
                                                                ))}
                                                        <span className="text-sm text-cyan-700 pl-5">{product_reviews} ratings</span>
                                                </div>
                                                <p className="pt-5">{product.description}</p>
                                          </div>
                                          
                                          <div className="flex flex-col">
                                                <div className="flex justify-between">
                                                        <p>Buy new</p>
                                                        <p>${product.price}</p>
                                                </div>
                                                <p>Status</p>
                                                <p>Quantity</p>
                                                <p></p>
                                          </div>
                                </div>
                                <div></div>
                                <div></div>
                                <div></div>

                        </div>
                        <div className="mx-auto pt-3 w-60 bg-gray-100">

                                <div className="grid grid-rows-2 mb-3 px-3">
                                        <p className="pt-4">
                                                <span className="align-top">$</span>
                                                <span className="text-xl font-bold">{product_price_integer}</span>
                                                <span className="align-top">{product_price_fraction}</span>
                                        </p>

                                        

                                        <div className="">
                                                <div className="text-amber-500 inline pr-2">
                                                        {Array(Math.floor(product.stars))
                                                                .fill()
                                                                .map((_, i) => (
                                                                        <span key={i}>&#9733;</span>
                                                                ))}
                                                </div>
                                                <span className="text-sm">{product_reviews}</span>
                                        </div>
                                </div>
                                <button className="text-sm text-center border-yellow-500 bg-amber-200 w-full py-1 rounded hover:bg-amber-300">Add to Cart</button>   
                        </div>        
                        <Footer />                
                </div>

        )
}

export default Product;
