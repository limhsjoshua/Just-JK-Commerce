import React from "react";
import {
  Button,
  Container,
  Typography,
  TextField,
  Divider,
} from "@material-ui/core";

import { useState } from "react";

const SignUp = () => {
  const [signUp, setSignUp] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  return (
    <div className="SignUp">
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
            Sign Up
          </Typography>
          <br />
          <TextField type={"email"} placeholder={"Email"} />
          <br />
          <TextField type={"password"} placeholder={"Password"} />
          <br />
          <TextField type={"text"} placeholder={"First Name"} />
          <br />
          <TextField type={"text"} placeholder={"Last Name"} />
          <br />
          <Button variant="contained" type={"submit"} color="">
            Create Account
          </Button>
          <br />
          <br />
          <br />
        </Container>
      </form>
    </div>
  );
};

export default SignUp;
