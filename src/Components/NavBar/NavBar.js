import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
} from "@material-ui/core";
import { ShoppingCart, PersonOutline, ExitToApp } from "@material-ui/icons";
import logo from "../../assets/jklogo.png";
import useStyles from "./styles";
import { signOut } from "firebase/auth";

const NavBar = ({ cart, user, setUser, auth }) => {
  let navigate = useNavigate();

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        navigate("/", { replace: true });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

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
          <Link to="/products">Products </Link>
          {user && <Link to="/orders">Orders </Link>}
          {!user && (
            <Link to="/login">
              <PersonOutline />
            </Link>
          )}
          {user && <ExitToApp onClick={handleLogOut} />}
          <Link to="/cart">
            <IconButton aria-label="Show cart items" color="inherit">
              <Badge
                badgeContent={cart.reduce((a, b) => a + b.quantity, 0)}
                color="secondary"
              >
                <ShoppingCart />
              </Badge>
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
