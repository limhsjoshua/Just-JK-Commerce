import React, { useEffect, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { Order } from "./Order";
import {
  query,
  collection,
  getDocs,
  where,
  doc,
  setDoc,
  orderBy,
} from "firebase/firestore";
import emailjs from "@emailjs/browser";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

const Orders = ({ db, user, setCart }) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const orderId = params.get("order");
  const success = params.get("success");
  console.log(orderId, success);

  const [orders, setOrders] = useState([]);

  const handlePaymentSuccess = async (currOrder) => {
    let productsText = "";
    currOrder.products.forEach((product) => {
      productsText += `${product.quantity} x ${product.name} - $${product.price} <br>`;
    });
    await setDoc(doc(db, "orders", currOrder.id), {
      ...currOrder,
      status: "paid",
    });
    setCart([]);
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === currOrder.id) {
          return {
            ...currOrder,
            status: "paid",
          };
        }
        return order;
      })
    );
    emailjs
      .send(
        "service_9deqn3y",
        "template_vglgj3f",
        {
          order_id: currOrder.id,
          name: currOrder.name,
          address: currOrder.address,
          email: currOrder.email,
          delivery: currOrder.delivery,
          products: productsText,
          total: currOrder.total,
          link: `localhost:3000/confirm-shipped?order=${currOrder.id}`,
        },
        "23GC5shygPuTYgokC"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, "orders"),
        where("userId", "==", user.uid || null),
        orderBy("dateCreated", "desc")
      );
      getDocs(q)
        .then((res) => {
          const ordersFromDb = [];
          res.forEach((doc) => ordersFromDb.push(doc.data()));
          setOrders(ordersFromDb);
          return ordersFromDb;
        })
        .then((ordersFromDb) => {
          if (orderId && success) {
            const currOrder = ordersFromDb.filter(
              (order) => order.id === orderId
            )[0];
            handlePaymentSuccess(currOrder);
          }
        });
    }
  }, [user]);

  if (!orderId && !success & !user) return <Navigate to="/" />;

  const OrderJsx = orders.map((order, idx) => (
    <Order key={`order-${idx}`} order={order} />
  ));

  return (
    <Container style={{ marginTop: 80, marginBottom: 30 }}>
      <Typography
        variant="h4"
        style={{
          padding: 20,
          fontFamily: "Merriweather",
          fontWeight: "900",
          marginBottom: 30,
        }}
      >
        My Orders
      </Typography>
      {orders.length > 0 ? (
        OrderJsx
      ) : (
        <Typography
          variant="subtitle1"
          style={{
            fontFamily: "Merriweather",
            fontWeight: "900",
            marginTop: "50px",
            paddingLeft: 20,
          }}
        >
          You have no orders currently.
        </Typography>
      )}
    </Container>
  );
};

export default Orders;
