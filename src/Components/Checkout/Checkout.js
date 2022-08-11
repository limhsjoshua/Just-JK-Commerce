import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import CheckoutItems from "./CheckoutItems";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import FormGroup from "@material-ui/core/FormGroup";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import { addDoc, collection, setDoc, doc } from "firebase/firestore";

const validationSchema = yup.object({
  name: yup.string("Enter your name").required("Name is required"),
  address: yup.string("Enter your address").required("Password is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  delivery: yup
    .string("Enter delivery type")
    .required("Delivery type is required"),
});

const deliveryPrices = { standard: 1.99, express: 4.99 };

export default function Checkout({ db, cart, user }) {
  const [order, setOrder] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [paymentLink, setPaymentLink] = useState(null);

  const handleCloseCancel = () => {
    setIsOpen(false);
    // delete order
    // redirect back to cart page
  };

  const handleCloseProceed = () => {
    setIsOpen(false);
  };

  const createNewOrder = async (order) => {
    try {
      const docRef = await addDoc(collection(db, "orders"), order);
      const newOrder = { ...order, id: docRef.id };
      await setDoc(doc(db, "orders", docRef.id), newOrder);
      setOrder(newOrder);
      const res = await axios.post(
        "http://localhost:4242/create-checkout-session",
        { price: order.total * 100, order: newOrder }
      );
      setPaymentLink(res.data);
      setIsOpen(true);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      email: "",
      delivery: "standard",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const data = {
        ...values,
        products: cart,
        total: total,
        status: "checkout",
        userId: user.uid,
      };
      await createNewOrder(data);
    },
  });

  const subTotal = cart
    .reduce((a, b) => a + b.price * b.quantity, 0)
    .toFixed(2);
  const deliveryPrice = deliveryPrices[formik.values.delivery];
  const total = (Number(subTotal) + Number(deliveryPrice)).toFixed(2);

  return (
    <Container style={{ marginTop: 80 }}>
      <Typography
        variant="h4"
        style={{
          padding: 20,
          fontFamily: "Merriweather",
          fontWeight: "900",
          marginBottom: 30,
        }}
      >
        Checkout
      </Typography>
      <CheckoutItems cart={cart} />
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell
                style={{ fontFamily: "Merriweather", fontWeight: "300" }}
                align="center"
              >
                Sub-Total
              </TableCell>
              <TableCell
                style={{ fontFamily: "Merriweather", fontWeight: "300" }}
                align="center"
              >
                ${subTotal}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                style={{ fontFamily: "Merriweather", fontWeight: "300" }}
                align="center"
              >
                Shipping
              </TableCell>
              <TableCell
                style={{ fontFamily: "Merriweather", fontWeight: "300" }}
                align="center"
              >
                ${deliveryPrice}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                style={{ fontFamily: "Merriweather", fontWeight: "900" }}
                align="center"
              >
                Total
              </TableCell>
              <TableCell
                style={{ fontFamily: "Merriweather", fontWeight: "900" }}
                align="center"
              >
                ${total}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <Typography
        variant="body1"
        style={{
          padding: 20,
          fontFamily: "Merriweather",
          fontWeight: "900",
        }}
      >
        Customer Information
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <FormGroup>
          <TextField
            id="name"
            name="name"
            label="Name"
            placeholder="John Doe"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            inputProps={{ style: { fontFamily: "Merriweather" } }}
            InputLabelProps={{ style: { fontFamily: "Merriweather" } }}
          />
          <TextField
            id="address"
            name="address"
            label="Address"
            placeholder="1 Marina Way"
            multiline
            minRows={3}
            value={formik.values.address}
            onChange={formik.handleChange}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
            inputProps={{ style: { fontFamily: "Merriweather" } }}
            InputLabelProps={{ style: { fontFamily: "Merriweather" } }}
          />
          <TextField
            id="email"
            name="email"
            label="Email"
            placeholder="johndoe@justjk.com"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            inputProps={{ style: { fontFamily: "Merriweather" } }}
            InputLabelProps={{ style: { fontFamily: "Merriweather" } }}
          />
          <InputLabel
            style={{
              marginTop: 20,
              marginBottom: 10,
              fontFamily: "Merriweather",
              fontWeight: 900,
            }}
          >
            Delivery Type
          </InputLabel>
          <Select
            id="delivery"
            name="delivery"
            value={formik.values.delivery}
            onChange={formik.handleChange}
            style={{ fontFamily: "Merriweather" }}
          >
            <MenuItem value={"standard"} style={{ fontFamily: "Merriweather" }}>
              Standard (+${deliveryPrices.standard}) : 4-5 working days
            </MenuItem>
            <MenuItem value={"express"} style={{ fontFamily: "Merriweather" }}>
              Express (+${deliveryPrices.express}) : 2-3 working days
            </MenuItem>
          </Select>
          <div
            style={{
              display: "flex",
              justifyContent: "right",
              marginBottom: 50,
            }}
          >
            <Button
              variant="contained"
              type="submit"
              style={{
                marginTop: 50,
                fontFamily: "Merriweather",
                backgroundColor: "black",
                color: "white",
                width: "30%",
                // padding: "5px 45px",
              }}
            >
              Submit
            </Button>
          </div>
        </FormGroup>
      </form>
      {order && (
        <Dialog
          open={isOpen}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Proceed to payment page"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {paymentLink
                ? "Please click on 'Proceed' to make payment. The link opens in a new tab."
                : "Please wait while the payment link is generated"}
            </DialogContentText>
          </DialogContent>
          {paymentLink && (
            <DialogActions>
              <Button onClick={handleCloseCancel}>Cancel</Button>
              <a href={paymentLink} target="_blank" rel="noopener noreferrer">
                <Button onClick={handleCloseProceed} autoFocus>
                  Proceed
                </Button>
              </a>
            </DialogActions>
          )}
        </Dialog>
      )}
    </Container>
  );
}
