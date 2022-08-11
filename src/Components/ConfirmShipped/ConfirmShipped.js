import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

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
      <Container style={{ marginTop: 80, marginBottom: 30 }}>
        <Typography
          variant="body1"
          style={{
            paddingLeft: 20,
            paddingTop: 20,
            fontFamily: "Merriweather",
            fontWeight: "300",
          }}
        >
          Loading...
        </Typography>
      </Container>
    );
  }

  if (order !== null) {
    if (order === false) {
      return (
        <Container style={{ marginTop: 80, marginBottom: 30 }}>
          <Typography
            variant="body1"
            style={{
              paddingLeft: 20,
              paddingTop: 20,
              fontFamily: "Merriweather",
              fontWeight: "300",
            }}
          >
            Invalid Order Id
          </Typography>
        </Container>
      );
    }
    if (order.status === "shipped") {
      return (
        <Container style={{ marginTop: 80, marginBottom: 30 }}>
          <Typography
            variant="body1"
            style={{
              paddingLeft: 20,
              paddingTop: 20,
              fontFamily: "Merriweather",
              fontWeight: "300",
            }}
          >
            Order {order.id} has already been shipped!
          </Typography>
        </Container>
      );
    } else if (order.status !== "paid") {
      return (
        <Container style={{ marginTop: 80, marginBottom: 30 }}>
          <Typography
            variant="body1"
            style={{
              paddingLeft: 20,
              paddingTop: 20,
              fontFamily: "Merriweather",
              fontWeight: "300",
            }}
          >
            Order {order.id} still processing, should not be ready for shipping
            yet
          </Typography>
        </Container>
      );
    }
  }

  if (confirmation) {
    return (
      <Container style={{ marginTop: 80, marginBottom: 30 }}>
        <Typography
          variant="body1"
          style={{
            paddingLeft: 20,
            paddingTop: 20,
            fontFamily: "Merriweather",
            fontWeight: "300",
          }}
        >
          Order status for order {order.id} updated! Thank you!
        </Typography>
      </Container>
    );
  }

  const productsJsx = order.products.map((product) => (
    <li>
      {product.quantity} x {product.name}
    </li>
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
        Shipping Checklist
      </Typography>
      <Typography
        variant="body1"
        style={{
          paddingLeft: 20,
          fontFamily: "Merriweather",
          fontWeight: "300",
        }}
      >
        Have the following items been packed?
      </Typography>
      <div
        style={{
          paddingLeft: 20,
          marginTop: 30,
          marginBottom: 30,
          fontFamily: "Merriweather",
        }}
      >
        <ul>
          {productsJsx}
          <li>
            <b>
              {order.delivery[0].toUpperCase() + order.delivery.substring(1)}{" "}
              shipping to {order.address}
            </b>
          </li>
        </ul>
      </div>
      <div
        style={{
          paddingLeft: 20,
          marginTop: 30,
          marginBottom: 30,
        }}
      >
        <Button
          size="large"
          style={{
            fontFamily: "Merriweather",
            backgroundColor: "black",
            color: "white",
            paddingLeft: 50,
            paddingRight: 50,
          }}
          onClick={handleClick}
        >
          Confirm
        </Button>
      </div>
    </Container>
  );
}
