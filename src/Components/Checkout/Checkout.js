import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
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
import { addDoc, collection } from "firebase/firestore";

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

export default function Checkout({ db, cart }) {
  const [order, setOrder] = useState(null);

  const createNewOrder = async (order) => {
    try {
      const docRef = await addDoc(collection(db, "orders"), order);
      setOrder({ ...order, id: docRef.id });
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
      };
      await createNewOrder(data);
    },
  });

  const subTotal = cart.reduce((a, b) => a + b.price, 0).toFixed(2);
  const deliveryPrice = deliveryPrices[formik.values.delivery];
  const total = (Number(subTotal) + Number(deliveryPrice)).toFixed(2);

  return (
    <div style={{ marginTop: 100 }}>
      <CheckoutItems cart={cart} />
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell align="center">Sub-Total</TableCell>
              <TableCell align="center">{subTotal}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">Shipping</TableCell>
              <TableCell align="center">{deliveryPrice}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">
                <b>Total</b>
              </TableCell>
              <TableCell align="center">
                <b>{total}</b>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <h3>Customer Information</h3>
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
          />
          <InputLabel>Delivery Type</InputLabel>
          <Select
            id="delivery"
            name="delivery"
            value={formik.values.delivery}
            onChange={formik.handleChange}
          >
            <MenuItem value={"standard"}>
              Standard (+${deliveryPrices.standard})
            </MenuItem>
            <MenuItem value={"express"}>
              Express (+${deliveryPrices.express})
            </MenuItem>
          </Select>
          <Button color="primary" variant="contained" type="submit">
            Submit
          </Button>
        </FormGroup>
      </form>
      {order && (
        <Link to="/payment" state={{ order }}>
          <Button color="primary" variant="contained" type="submit">
            Proceed to payment
          </Button>
        </Link>
      )}
    </div>
  );
}
