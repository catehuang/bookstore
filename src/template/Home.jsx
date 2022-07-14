import React from 'react';
import Header from "./Header";
import Books_Nav from "./Books_Nav";
import SubHeader from "./SubHeader";
import Footer from "./Footer";

function Home() {
  return (
    <div className="h-screen">
                <header>
                        <Header department="Books"/>
                        <Books_Nav />
                </header>

                <main>

                </main>
                <footer><Footer /></footer>
    </div>
  )
}

export default Home
