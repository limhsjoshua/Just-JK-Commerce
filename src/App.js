import "./App.css";
import Products from "./Components/Products/Products";
import Checkout from "./Components/Checkout/Checkout";
import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import db from "./util/Firebase";
import NavBar from "./Components/NavBar/NavBar";

const getCartFromLs = () => {
  const cart = localStorage.getItem("cart");
  if (cart) {
    return JSON.parse(cart);
  }
  return [];
};

const App = () => {
  const [cart, setCart] = useState(getCartFromLs());
  return (
    <div>
      <div>
        <NavBar cart={cart} />
      </div>
      <Routes>
        <Route
          path="products"
          element={<Products db={db} cart={cart} setCart={setCart} />}
        />
        <Route path="checkout" element={<Checkout />} />
      </Routes>
    </div>
  );
};

export default App;
