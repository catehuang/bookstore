import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Book from "./pages/Book";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import Orders from "./pages/Orders";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import BookManagement from "./pages/BookManagement";
import UserManagement from "./pages/UserManagement";
import AdminHeader from "./components/AdminHeader";
import Analysis from "./pages/Analysis";

function App() {
    const user = useSelector((state) => state.user.currentUser);
    const promise = loadStripe(
        "pk_test_51L2PfuDPS4dF2ifLrzPZD0G23PEWfMW4tALkMdPTcgyUl5j2bO6OmXWqoaRyMHQFEYqfoVLtIZIiE8rigU1pLvac00Hgc1joB2"
    );

    return (
        <BrowserRouter>
            <Header />
            {user?.isAdmin === "admin" && <AdminHeader />}
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
                <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
                <Route
                    path="/register"
                    element={user ? <Navigate to="/" /> : <Register />}
                />
                <Route
                    path="/orders"
                    element={!user ? <Navigate to="/" /> : <Orders />}
                />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/logout" element={<Home />} />
                <Route path="/books/:id" element={<Book />} />
                <Route
                    path="/bookManagement"
                    element={
                        user?.isAdmin === "admin" ? <BookManagement /> : <Navigate to="/" />
                    }
                />
                                <Route
                    path="/userManagement"
                    element={
                        user?.isAdmin === "admin" ? <UserManagement /> : <Navigate to="/" />
                    }
                />
                                <Route
                    path="/analysis"
                    element={
                        user?.isAdmin === "admin" ? <Analysis /> : <Navigate to="/" />
                    }
                />
                <Route exact path="/" element={<Home />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
