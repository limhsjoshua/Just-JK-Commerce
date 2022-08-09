import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Button } from "@material-ui/core";

export default function ConfirmShipped({ db }) {
  const location = useLocation();

  const orderId = location.search.split("?order=")[1];

  const [order, setOrder] = useState(null);
  useEffect(() => {
    getDoc(doc(db, "orders", orderId)).then((docSnap) => {
      if (docSnap.exists()) setOrder(docSnap.data());
    });
  }, []);

  console.log(order);

  const handleClick = async () => {
    try {
      await setDoc(doc(db, "orders", order.id), {
        ...order,
        status: "shipped",
      });
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };

  return (
    <div style={{ marginTop: 100 }}>
      <h1>Confirm Shipping for Item?</h1>
      <Button onClick={handleClick}>Item Shipped!</Button>
    </div>
  );
}
