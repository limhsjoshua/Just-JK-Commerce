import React from "react";
import {
  Button,
  Container,
  Typography,
  TextField,
  Divider,
} from "@material-ui/core";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import axios from "axios";

const LogIn = ({ auth, setUser, user }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginButton = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
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
          <Typography
            variant="h6"
            padding={3}
            style={{ fontFamily: "Merriweather", fontWeight: "900" }}
          >
            Login
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
          <Button
            variant="contained"
            type={"submit"}
            color="primary"
            onClick={handleLoginButton}
            style={{ backgroundColor: "black", fontFamily: "Merriweather" }}
          >
            Login
          </Button>
          <br />
          <br />
          <br />
          <Typography
            variant="subtitle1"
            padding={3}
            style={{ fontFamily: "Merriweather", fontWeight: "900" }}
          >
            Don't have an account?
          </Typography>
          <br />
          <Link to="/signup" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              type={"submit"}
              color="primary"
              style={{
                fontFamily: "Merriweather",
                backgroundColor: "black",
              }}
            >
              Create an account
            </Button>
          </Link>
        </Container>
      </form>
    </div>
  );
};

export default LogIn;
