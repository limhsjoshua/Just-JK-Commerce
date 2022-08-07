import "./App.css";
import Products from "./Components/Products/Products";
import Checkout from "./Components/Checkout/Checkout";
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
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

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
