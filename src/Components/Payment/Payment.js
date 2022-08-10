import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import emailjs from "@emailjs/browser";
import { doc, setDoc } from "firebase/firestore";

export default function Payment({ db }) {
  const location = useLocation();

  if (!location.state)
    return (
      <div style={{ marginTop: 100 }}>
        <h1>Invalid page</h1>
        <Link to="/">
          <Button>Return to home</Button>
        </Link>
      </div>
    );

  const { order } = location.state;

  console.log(order);

  let productsText = "";
  order.products.forEach((product) => {
    productsText += `${product.quantity} x ${product.name} - $${product.price} <br>`;
  });

  const handlePay = async () => {
    try {
      await setDoc(doc(db, "orders", order.id), {
        ...order,
        status: "paid",
      });
      emailjs
        .send(
          "service_9deqn3y",
          "template_vglgj3f",
          {
            order_id: order.id,
            name: order.name,
            address: order.address,
            email: order.email,
            delivery: order.delivery,
            products: productsText,
            total: order.total,
            link: `localhost:3000/confirm-shipped?order=${order.id}`,
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
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };

  return (
    <div style={{ marginTop: 100 }}>
      <h1>{order.id}</h1>
      <Button onClick={handlePay}>Pay</Button>
    </div>
  );
}
