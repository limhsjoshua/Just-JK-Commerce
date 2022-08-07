import "./App.css";
import Products from "./Components/Products/Products";
import Checkout from "./Components/Checkout/Checkout";
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import db from "./util/Firebase";
import NavBar from "./Components/NavBar/NavBar";

const App = () => {
  return (
    <div>
      <div>
        <NavBar />
      </div>
      <Routes>
        <Route path="products" element={<Products />} />
        <Route path="checkout" element={<Checkout />} />
      </Routes>
    </div>
  );
};

export default App;
