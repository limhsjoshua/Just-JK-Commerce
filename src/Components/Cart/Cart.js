import React from "react";
import { Container, Typography, Grid, Button } from "@material-ui/core";
import useStyles from "./styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CartItem from "./CartItem/CartItem";
import { Link } from "react-router-dom";

const Cart = ({ cart, setCart, user }) => {
  const classes = useStyles();

  const isEmpty = cart.length === 0;

  const emptyCart = () => {
    if (window.confirm("Do you want to remove all items from cart?")) {
      setCart([]);
    }
  };

  const addQtyInCart = (product) => {
    const newCart = cart.map((item) => {
      if (item.id === product.id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(newCart);
  };

  const reduceQtyInCart = (product) => {
    if (product.quantity <= 1) {
      if (window.confirm("Do you want to remove this item from cart?")) {
        setCart((prev) => prev.filter((item) => item.id !== product.id));
      }
    } else {
      const newCart = cart.map((item) => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
      setCart(newCart);
    }
  };

  const EmptyCart = () => (
    <Typography
      variant="subtitle1"
      style={{
        fontFamily: "Merriweather",
        fontWeight: "900",
        marginTop: "50px",
        paddingLeft: 20,
      }}
    >
      You have no items in your shopping cart.
    </Typography>
  );

  const FilledCart = () => (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                style={{ fontFamily: "Merriweather", fontWeight: "900" }}
                align="center"
              >
                S/N
              </TableCell>
              <TableCell
                style={{ fontFamily: "Merriweather", fontWeight: "900" }}
                align="center"
              >
                Product
              </TableCell>
              <TableCell
                style={{ fontFamily: "Merriweather", fontWeight: "900" }}
                align="left"
              >
                Product Name
              </TableCell>
              <TableCell
                style={{ fontFamily: "Merriweather", fontWeight: "900" }}
                align="center"
              >
                Unit Price
              </TableCell>
              <TableCell
                style={{ fontFamily: "Merriweather", fontWeight: "900" }}
                align="center"
              >
                Quantity
              </TableCell>
              <TableCell
                style={{ fontFamily: "Merriweather", fontWeight: "900" }}
                align="center"
              >
                Total Price
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.map((item, idx) => (
              <CartItem
                key={`item${item.id}`}
                item={item}
                idx={idx}
                addQtyInCart={addQtyInCart}
                reduceQtyInCart={reduceQtyInCart}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={classes.cardDetails}>
        <Typography
          variant="h5"
          style={{ fontFamily: "Merriweather", fontWeight: "900" }}
        >
          Sub-Total: $
          {cart.reduce((a, b) => a + b.price * b.quantity, 0).toFixed(2)}
        </Typography>
        <div>
          <Button
            className={classes.emptyButton}
            size="large"
            type="button"
            variant="contained"
            color="default"
            onClick={emptyCart}
            style={{
              fontFamily: "Merriweather",
            }}
          >
            Empty Cart
          </Button>
          <Link
            to={user ? "/checkout" : "/login"}
            style={{ textDecoration: "none" }}
          >
            <Button
              className={classes.checkoutButton}
              size="large"
              type="button"
              variant="contained"
              color="primary"
              style={{
                fontFamily: "Merriweather",
                backgroundColor: "black",
                color: "white",
                // padding: "5px 45px",
              }}
            >
              Checkout
            </Button>
          </Link>
        </div>
      </div>
    </>
  );

  return (
    <Container style={{ marginTop: 12, marginBottom: 30 }}>
      <div className={classes.toolbar} />
      <Typography
        variant="h4"
        style={{
          padding: 20,
          fontFamily: "Merriweather",
          fontWeight: "900",
          marginBottom: 30,
        }}
      >
        Your Shopping Cart
      </Typography>
      {isEmpty ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
};

export default Cart;
