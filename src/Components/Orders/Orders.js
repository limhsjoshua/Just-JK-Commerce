import React, { useState } from "react";
import { Order } from "./Order";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const OrderJsx = orders.map((order) => <Order order={order} />);

  return (
    <div style={{ marginTop: 100 }}>
      <h1>My Orders</h1>
      {OrderJsx}
    </div>
  );
};

export default Orders;
