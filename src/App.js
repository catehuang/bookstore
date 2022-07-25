import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Book from "./pages/Book";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";


function App() {
  
  const user = useSelector(state => state.user.currentUser);

  return (
    <BrowserRouter>
    <Header />
      <Routes>
       <Route path="/logout" element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/books/:id" element={<Book/>}></Route>
        <Route path="/" element={<Home />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
