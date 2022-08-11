import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
} from "@material-ui/core";
import { PersonOutline, ExitToApp } from "@material-ui/icons";
import logo from "../../assets/jklogo.png";
import useStyles from "./styles";
import { signOut } from "firebase/auth";
import CartDropdown from "../CartDropdown/CartDropdown";
import "./NavBar.css";
import axios from "axios";

const NavBar = ({ cart, user, setUser, auth }) => {
  let navigate = useNavigate();

  // const theme = createTheme({
  //   typography: {
  //     fontFamily: ["Rubik Maze", "cursive"].join(","),
  //     // h6: {
  //     //   fontSize: 65,
  //     // },
  //   },
  // });

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        return axios.delete("http://localhost:4242/delete-jwt", {
          withCredentials: true,
        });
      })
      .then(({ data }) => {
        if (data.logout) {
          navigate("/", { replace: true });
        }
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
      <AppBar
        position="fixed"
        className={classes.appBar}
        style={{ backgroundColor: "black" }}
      >
        <Toolbar>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            {/* <ThemeProvider theme={theme}> */}
            <p
              style={{
                fontFamily: "Rubik Maze",
                fontSize: 40,
                margin: 0,
                padding: 0,
              }}
            >
              {/* <img
                  src={logo}
                  alt="Just JK Commerce"
                  height="25px"
                  className={classes.image}
                /> */}
              JK
            </p>
            {/* </ThemeProvider> */}
          </Link>
          <div className={classes.grow} />
          <div className={classes.button} />
          <Link
            className="productsLink"
            to="/products"
            style={{ textDecoration: "none", color: "white", marginRight: 35 }}
          >
            Products{" "}
          </Link>
          {user && (
            <Link
              to="/orders"
              style={{
                fontFamily: "Rubik Maze",
                color: "white",
                marginRight: 20,
                textDecoration: "none",
              }}
            >
              Orders{" "}
            </Link>
          )}
          {!user && (
            <Link to="/login" style={{ color: "white", marginRight: 20 }}>
              <PersonOutline />
            </Link>
          )}
          {user && <ExitToApp onClick={handleLogOut} />}
          <CartDropdown cart={cart} />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
