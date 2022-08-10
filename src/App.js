import "./App.css";
import Products from "./Components/Products/Products";
import Checkout from "./Components/Checkout/Checkout";
import Payment from "./Components/Payment/Payment";
import ConfirmShipped from "./Components/ConfirmShipped/ConfirmShipped";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import db from "./util/Firebase";
import NavBar from "./Components/NavBar/NavBar";
import Cart from "./Components/Cart/Cart";
import Auth from "./Components/Auth/Auth";
import SignUp from "./Components/SignUp/SignUp";

const getCartFromLs = () => {
  const cart = localStorage.getItem("cart");
  if (cart) {
    return JSON.parse(cart);
  }
  return [];
};

const App = () => {
  const [cart, setCart] = useState(getCartFromLs());

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  console.log(cart);
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
        <Route path="cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="auth" element={<Auth />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="checkout" element={<Checkout db={db} cart={cart} />} />
        <Route path="payment" element={<Payment db={db} />} />
        <Route path="confirm-shipped" element={<ConfirmShipped db={db} />} />
      </Routes>
    </div>
  );
};

export default App;
