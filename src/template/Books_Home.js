import React from "react";
import Product_Books from "./Product_Books";
import Header from "./Header";
import SubHeader from "./SubHeader";
import Books_Nav from "./Books_Nav";
import Footer from "./Footer";

function Home_Books() {
  return (
    <div className="mx-auto">
      <Header department="Books" />
      <SubHeader />
      <Books_Nav />
      <div className="bg-gray-100">
        <img
          className="w-full"
          src="https://images-na.ssl-images-amazon.com/images/G/15/Books/XCM_Manual_2316200_4654576_1500x300_en_US.jpg"
          alt=""
        />

        <div className="grid grid-cols-2 grid-flow-row gap-10 p-10">
          <div className="">
            <img src="https://images-na.ssl-images-amazon.com/images/G/15/CA-hq/2021/img/Books/XCM_Manual_2321499_4668654_750x375_en_CA.jpg" />
          </div>
          <div className="">
            <img src="https://images-na.ssl-images-amazon.com/images/G/15/CA-hq/2021/img/Books/XCM_Manual_2321501_4668655_750x375_en_CA.jpg" />
          </div>

          <div className="">
            <img src="https://images-na.ssl-images-amazon.com/images/G/15/CA-hq/2021/img/Books/XCM_Manual_2296405_4637785.jpg" />
          </div>
          <div className="">
            <img src="https://images-na.ssl-images-amazon.com/images/G/15/CA-hq/2021/img/Books/XCM_Manual_2321500_4668653_750x375_en_CA.jpg" />
          </div>
        </div>

        <div className="mx-10 my-10">
          <div className="flex gap-10">
            <p className="text-3xl font-bold">Best sellers</p>
            <p className="text-2xl text-cyan-600 pt-1">See more</p>
          </div>
          <div className="mt-5 grid grid-cols-6 grid-flow-row gap-3">
            <Product_Books
              id="14565878"
              title="It Ends with Us: A Novel (Volume 1)"
              price_sale={15.09}
              image="https://images-na.ssl-images-amazon.com/images/I/71EwoNQypZL._AC._SR360,460.jpg"
              rating_global={4}
              rating={72291}
            />
            <Product_Books
              id="154873154"
              title="Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones"
              price_sale={21.66}
              image="https://images-na.ssl-images-amazon.com/images/I/81wgcld4wxL._AC._SR360,460.jpg"
              rating_global={4}
              rating={71143}
            />
            <Product_Books
              id="15445654"
              title="Reminders of Him: A Novel"
              price_sale={12.28}
              image="https://images-na.ssl-images-amazon.com/images/I/617uZq23IPL._AC._SR360,460.jpg"
              rating_global={4}
              rating={76078}
            />
            <Product_Books
              id="12484321"
              title="Verity"
              price_sale={15.5}
              image="https://images-na.ssl-images-amazon.com/images/I/610QYM5NxRL._AC._SR360,460.jpg"
              rating_global={4}
              rating={57591}
            />
            <Product_Books
              id="12234321"
              title="The Fiber Fueled Cookbook: Inspiring Plant-Based Recipes to Turbocharge Your Health"
              price_sale={26.5}
              image="https://images-na.ssl-images-amazon.com/images/I/91cDoM87dYL._AC._SR360,460.jpg"
              rating_global={5}
              rating={119}
            />
            <Product_Books
              id="12484641"
              title="The Seven Husbands of Evelyn Hugo: A Novel"
              price_sale={14.7}
              image="https://images-na.ssl-images-amazon.com/images/I/71pQQ9mk8eL._AC._SR360,460.jpg"
              rating_global={4}
              rating={64109}
            />
            {/* <Product_Books
                        id="66484321"
                        title="Where the Crawdads Sing"
                        price_sale={15.5}
                        image="https://images-na.ssl-images-amazon.com/images/I/61m1Vxw8tiL._AC._SR360,460.jpg"
                        rating_global={4}
                        rating={219108}
                        /> */}
          </div>
        </div>

        <div className="mx-10 pt-5 pb-10">
          <div className="flex gap-10">
            <p className="text-3xl font-bold">Best sellers</p>
            <p className="text-2xl text-cyan-600 pt-1">See more</p>
          </div>
          <div className="mt-5 grid grid-cols-6 grid-flow-row gap-3">
            <Product_Books
              id="14575454"
              title="Weight Loss by Gina - Spring/Summer 2022: Posts and Guidelines)"
              price_sale={22.0}
              image="https://images-na.ssl-images-amazon.com/images/I/61xPsfUSHCL._AC._SR360,460.jpg"
              rating_global={4}
              rating={41}
            />
            <Product_Books
              id="11456784"
              title="Atlas of the Heart: Mapping Meaningful Connection and the Language of Human Experience"
              price_sale={22.99}
              image="https://m.media-amazon.com/images/I/91DNhLLmUOL._AC_UL320_.jpg"
              rating_global={4}
              rating={8885}
            />
            <Product_Books
              id="12345678"
              title="Dr. Seuss Beginner Book Collection"
              price_sale={48.69}
              image="https://images-na.ssl-images-amazon.com/images/I/81FxtWFGiiL._AC._SR360,460.jpg"
              rating_global={5}
              rating={17264}
            />
            <Product_Books
              id="15465656"
              title="Half Baked Harvest Every Day: Recipes for Balanced, Flexible, Feel-Good Meals: A Cookbook"
              price_sale={26.52}
              image="https://images-na.ssl-images-amazon.com/images/I/919VQ6lxLiL._AC._SR360,460.jpg"
              rating_global={5}
              rating={1314}
            />
            <Product_Books
              id="19854254"
              title="First 100 Words: A Padded Board Books"
              price_sale={5.52}
              image="https://images-na.ssl-images-amazon.com/images/I/71aMpgf078L._AC._SR360,460.jpg"
              rating_global={4}
              rating={30284}
            />
            <Product_Books
              id="154873666"
              title="Daily Timeboxing Planner: Daily Scrum, Time Block Journal, Productivity, To-Do List, Time Management"
              price_sale={8.85}
              image="https://images-na.ssl-images-amazon.com/images/I/61wb-o356nS._AC._SR360,460.jpg"
              rating_global={3}
              rating={11}
            />
            {/* <Product_Books
              id="154877366"
              title="Fossil Future: Why Global Human Flourishing Requires More Oil, Coal, and Natural Gas--Not Less"
              price_sale={39.6}
              image="https://images-na.ssl-images-amazon.com/images/I/71q2KapfDsL._AC._SR360,460.jpg"
              rating_global={5}
              rating={1}
            /> */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home_Books;
