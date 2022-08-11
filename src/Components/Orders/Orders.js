import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Order } from "./Order";
import { query, collection, getDocs, where } from "firebase/firestore";

const Orders = ({ db, user }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, "orders"),
        where("userId", "==", user.uid || null)
      );
      getDocs(q).then((res) => {
        const ordersFromDb = [];
        res.forEach((doc) => ordersFromDb.push(doc.data()));
        setOrders(ordersFromDb);
      });
    }
  }, []);

  if (!user) return <Navigate to="/" />;

  const OrderJsx = orders.map((order, idx) => (
    <Order key={`order-${idx}`} order={order} />
  ));

  return (
    <div style={{ marginTop: 100 }}>
      <h1>My Orders</h1>
      {OrderJsx}
    </div>
  );
};

export default Orders;
