import "./App.css";
import Products from "./Components/Products/Products";
import Checkout from "./Components/Checkout/Checkout";
import Payment from "./Components/Payment/Payment";
import ConfirmShipped from "./Components/ConfirmShipped/ConfirmShipped";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { db, auth } from "./util/Firebase";
import NavBar from "./Components/NavBar/NavBar";
import Cart from "./Components/Cart/Cart";
import LogIn from "./Components/LogIn/LogIn";
import SignUp from "./Components/SignUp/SignUp";
import Orders from "./Components/Orders/Orders";
import Landing from "./Components/Landing/Landing";
import seedData from "./db/seeders/seed-products-data";
import axios from "axios";

const getCartFromLs = () => {
  const cart = localStorage.getItem("cart");
  if (cart) {
    return JSON.parse(cart);
  }
  return [];
};

const App = () => {
  const [cart, setCart] = useState(getCartFromLs());
  const [user, setUser] = useState(null);

  console.log(user);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const getUserIdFromJwt = async () => {
    const { data } = await axios.get("http://localhost:4242/check-jwt", {
      withCredentials: true,
    });
    setUser(data.user.user);
  };

  useEffect(() => {
    getUserIdFromJwt();
  }, []);

  return (
    <div>
      {/* <div style={{ marginTop: 100 }}>
        <button onClick={seedData}>Seed</button>
      </div> */}
      <div>
        <NavBar cart={cart} user={user} setUser={setUser} auth={auth} />
      </div>
      <Routes>
        <Route
          path="products"
          element={<Products db={db} cart={cart} setCart={setCart} />}
        />
        <Route path="cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route
          path="login"
          element={<LogIn auth={auth} setUser={setUser} user={user} />}
        />
        <Route
          path="signup"
          element={<SignUp auth={auth} setUser={setUser} user={user} />}
        />
        <Route
          path="checkout"
          element={<Checkout db={db} cart={cart} user={user} />}
        />
        <Route path="payment" element={<Payment db={db} />} />
        <Route path="confirm-shipped" element={<ConfirmShipped db={db} />} />
        <Route
          path="orders"
          element={<Orders db={db} user={user} setCart={setCart} />}
        />
        <Route path="/" element={<Landing />} />
      </Routes>
    </div>
  );
};

export default App;
