import React from "react";
import {
  Button,
  Container,
  Typography,
  TextField,
  Divider,
} from "@material-ui/core";
import { useState } from "react";
import { Link } from "react-router-dom";

const Auth = () => {
  const [auth, setAuth] = useState({
    email: "",
    password: "",
  });

  return (
    <div className="auth">
      <br />
      <br />
      <br />
      <form>
        <Container
          fixed
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "400px",
            alignItems: "center",
            marginTop: 100,
            padding: 50,
            borderRadius: 10,
            boxShadow: "5px 5px 10px 0px rgba(0,0,0,0.75)",
          }}
        >
          <Typography variant="h6" padding={3} textAlign="center">
            Login
          </Typography>
          <br />
          <TextField type={"email"} placeholder={"Email"} />
          <br />
          <TextField type={"password"} placeholder={"Password"} />
          <br />
          <Button variant="contained" type={"submit"} color="primary">
            Login
          </Button>
          <br />
          <br />
          <br />
          <Typography variant="h7" padding={3} textAlign="center">
            Don't have an account?
          </Typography>
          <br />
          <Link to="/signup" style={{ textDecoration: "none" }}>
            <Button variant="contained" type={"submit"} color="">
              Create an account
            </Button>
          </Link>
        </Container>
      </form>
    </div>
  );
};

export default Auth;

//html
//what state you need
//what functions you need
//where to place the functions
//where are you going to place this entire componenet? as an entire page or or a component within a page
