import React from "react";
import {
  Button,
  Container,
  Typography,
  TextField,
  Divider,
} from "@material-ui/core";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const SignUp = ({ auth, setUser, user }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUser(user);
        axios.post(
          "http://localhost:4242/generate-jwt",
          { user: user },
          { withCredentials: true }
        );
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  if (user) {
    return <Navigate to="/" />;
  }

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
          <Typography
            variant="h6"
            padding={3}
            style={{ fontFamily: "Merriweather", fontWeight: "900" }}
          >
            Sign Up
          </Typography>
          <br />
          <TextField
            type={"email"}
            placeholder={"Email"}
            value={email}
            onChange={handleEmailChange}
          />
          <br />
          <TextField
            type={"password"}
            placeholder={"Password"}
            value={password}
            onChange={handlePasswordChange}
          />
          <br />
          {/* <TextField type={"text"} placeholder={"First Name"} />
          <br />
          <TextField type={"text"} placeholder={"Last Name"} />
          <br /> */}
          <Button
            variant="contained"
            type={"submit"}
            onClick={handleSignUp}
            style={{
              fontFamily: "Merriweather",

              color: "white",
              backgroundColor: "black",
              marginTop: 50,
              marginBottom: -50,
            }}
          >
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
