import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Typography,
} from "@material-ui/core";
import { CallMissedSharp, ShoppingCart } from "@material-ui/icons";
import logo from "../../assets/jklogo.png";
import useStyles from "./styles";

const NavBar = ({ cart }) => {
  const classes = useStyles();
  return (
    <div>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography variant="h6" className={classes.title} color="inherit">
            <img
              src={logo}
              alt="Just JK Commerce"
              height="25px"
              className={classes.image}
            />
            Just JK Commerce
          </Typography>
          <div className={classes.grow} />
          <div className={classes.button} />
          <Link to="products">Products </Link>
          <Link to="checkout">Checkout</Link>
          <IconButton aria-label="Show cart items" color="inherit">
            <Badge badgeContent={cart.length} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
