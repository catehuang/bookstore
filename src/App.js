import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Book from "./pages/Book";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import Order from './pages/Order';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';



function App() {
    const user = useSelector((state) => state.user.currentUser);
    const promise = loadStripe('pk_test_51L2PfuDPS4dF2ifLrzPZD0G23PEWfMW4tALkMdPTcgyUl5j2bO6OmXWqoaRyMHQFEYqfoVLtIZIiE8rigU1pLvac00Hgc1joB2');
    
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route
                    path="/payment"
                    element={
                        user ? (
                            <Elements stripe={promise}>
                                <Payment />
                            </Elements>
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/logout" element={<Home />} />
                <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
                <Route
                    path="/register"
                    element={user ? <Navigate to="/" /> : <Register />}
                />
                <Route
                    path="/order"
                    element={!user ? <Navigate to="/" /> : <Order />}
                />
                <Route path="/books/:id" element={<Book />} />
                <Route path="/" element={<Home />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
