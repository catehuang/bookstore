import React from "react";
//import data from "../data";
import Header from "../components/Header";
import Navigator_Books from "../components/Navigator_Books";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import LockIcon from '@material-ui/icons/Lock';
import { Link } from "react-router-dom";


function Product(props) {
        const { id } = useParams();
        // Doesn't work if you use === this is from frontend
        const product = props.find(x => x.id == id);


        const product_price_integer = Math.floor(product.price);
        const product_price_fraction = (product.price - Math.floor(product.price)).toFixed(2).substring(2);
        const numberFormat = new Intl.NumberFormat('en-US');
        const product_reviews = numberFormat.format(product.reviews);
        const obj = {
                array: []
        };

        for (var i = 0; i < product.quantity; i++)
                obj.array[i] = i + 1;



        return (
                <div>
                        <Header department="Books"/>
                        <Navigator_Books />
                        <Link to="/">
                                <p className="py-5 px-10 text-sky-800"> &lt; back to result</p>
                        </Link>
                        <div className="flex flex-col gap-5 mx-auto px-10 py-5">
                                <div className="flex gap-5">
                                          <img className="object-contain w-60 h-fit" src={product.image} alt="" />
                                          <div className="flex flex-col w-1/2 grow">
                                                  <p className="text-3xl">{product.name}</p>
                                                  <p className="text-2xl text-gray-600">Paperback</p>
                                                  <p>by<span className="text-sky-800  px-1">{product.author}</span>(Author)
                                                </p>
                                                <div className="text-amber-500 inline pr-2">
                                                        {Array(Math.floor(product.stars))
                                                                .fill()
                                                                .map((_, i) => (
                                                                        <span key={i}>&#9733;</span>
                                                                ))}
                                                        <span className="text-sm text-sky-800 pl-5">{product_reviews} ratings</span>
                                                </div>
                                                <p className="pt-5">{product.description}</p>
                                          </div>
                                          
                                          <div className="invisible lg:visible flex flex-col w-72 h-fit border-2 border-gray-300 rounded p-5 gap-3 text-sm">
                                                <div className="flex justify-between">
                                                        <p className="font-bold text-base">Buy new</p>
                                                        <p className="text-red-700 text-lg font-bold">${product.price}</p>
                                                </div>
                                                <p className="text-sm"><span className="text-sky-800 font-bold">FREE delivery </span><span className=" font-bold">Tuesday, July 19 </span>on your first order. <span className="text-sky-800 font-bold">Details</span></p>
                                                <p className="text-lg text-green-700 font-bold">In Stcok.</p>
                                                <p className="text-sm">As an alternative, the <span className="text-sky-800 font-bold">Kindle eBook </span>is available now and can be read on any device with the free Kindle app. Want to Listen? <span className="text-sky-800 font-bold">Try Audible.</span></p>
                                                <div className="flex">
                                                        <p className="pr-2">Quantity: </p>
                                                        <select id="quantity" className="border border-gray-400 rounded">
                                                                { obj.array.map((num) =>
                                                                (
                                                                        <option key={num} value={num}>{num}</option>
                                                                ))};
                                                        </select>
                                                </div>
                                                <button className="text-sm text-center border-yellow-500 bg-yellow-400 w-full py-1 rounded hover:bg-yellow-500">Add to Cart</button> 
                                                <div className="flex text-gray-500 gap-3">
                                                        <LockIcon />
                                                        <p className="text-sky-800 font-bold">Secure transaction</p>
                                                </div>
                                                <p>Ships from and sold by Amazon.ca.</p>
                                                <div className="flex gap-2">
                                                        <input type="checkbox" />
                                                        <p>Add gift options</p>                                          
                                                </div>
                                          </div>
                                </div>
                        </div>
     
                        <Footer />                
                </div>

        )
}

export default Product;
