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

const Cart = ({ cart, setCart }) => {
  const classes = useStyles();

  const isEmpty = cart.length === 0;

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
    const newCart = cart.map((item) => {
      if (item.id === product.id) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCart(newCart);
  };

  const EmptyCart = () => (
    <Typography variant="subtitle1">
      You have no items in your shopping cart.
    </Typography>
  );

  const FilledCart = () => (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">S/N</TableCell>
              <TableCell align="center">Product</TableCell>
              <TableCell align="left">Product Name</TableCell>
              <TableCell align="center">Unit Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center">Total Price</TableCell>
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
        <Typography variant="h4">
          Subtotal: {cart.reduce((a, b) => a + b.price, 0).toFixed(2)}
        </Typography>
        <div>
          <Button
            className={classes.emptyButton}
            size="large"
            type="button"
            variant="contained"
            color="secondary"
          >
            Empty Cart
          </Button>
          <Button
            className={classes.checkoutButton}
            size="large"
            type="button"
            variant="contained"
            color="primary"
          >
            Checkout
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h3">
        {" "}
        Your Shopping Cart{" "}
      </Typography>
      {isEmpty ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
};

export default Cart;
