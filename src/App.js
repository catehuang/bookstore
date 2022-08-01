import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Book from "./pages/Book";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";


function App() {
  
  const user = useSelector(state => state.user.currentUser);

  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/payment" element={user? <Payment /> : <Navigate to="/login" /> } />
      <Route path="/checkout" element={<Checkout/>} />
       <Route path="/logout" element={<Home/>} />
        <Route path="/login" element={ user? <Navigate to="/" /> : <Login/>} />
        <Route path="/register" element={ user ? <Navigate to="/" /> : <Register/>} />
        <Route path="/books/:id" element={<Book/>} />
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
