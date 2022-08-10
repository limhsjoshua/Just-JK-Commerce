import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Button } from "@material-ui/core";

export default function ConfirmShipped({ db }) {
  const [confirmation, setConfirmation] = useState(false);
  const [order, setOrder] = useState(null);

  const location = useLocation();

  const orderId = location.search.split("?order=")[1];

  useEffect(() => {
    getDoc(doc(db, "orders", orderId)).then((docSnap) => {
      if (docSnap.exists()) {
        setOrder(docSnap.data());
      } else {
        setOrder(false);
      }
    });
  }, []);

  const handleClick = async () => {
    try {
      await setDoc(doc(db, "orders", order.id), {
        ...order,
        status: "shipped",
      });
      setConfirmation(true);
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };

  if (order === null) {
    return (
      <div style={{ marginTop: 100 }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (order !== null) {
    if (order === false) {
      return (
        <div style={{ marginTop: 100 }}>
          <p>Invalid Order Id</p>
        </div>
      );
    }
    if (order.status === "shipped") {
      return (
        <div style={{ marginTop: 100 }}>
          <p>Order {order.id} has already been shipped!</p>
        </div>
      );
    } else if (order.status !== "paid") {
      return (
        <div style={{ marginTop: 100 }}>
          <p>
            Order {order.id} still processing, should not be ready for shipping
            yet
          </p>
        </div>
      );
    }
  }

  if (confirmation) {
    return (
      <div style={{ marginTop: 100 }}>
        <p>Order status for order {order.id} updated! Thank you!</p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: 100 }}>
      <h1>Confirm that these items have been shipped?</h1>
      <Button onClick={handleClick}>Confirm</Button>
    </div>
  );
}
