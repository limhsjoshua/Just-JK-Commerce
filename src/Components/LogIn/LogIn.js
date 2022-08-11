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
          <Typography variant="h6" padding={3}>
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
          >
            Login
          </Button>
          <br />
          <br />
          <br />
          <Typography variant="subtitle1" padding={3}>
            Don't have an account?
          </Typography>
          <br />
          <Link to="/signup" style={{ textDecoration: "none" }}>
            <Button variant="contained" type={"submit"}>
              Create an account
            </Button>
          </Link>
        </Container>
      </form>
    </div>
  );
};

export default LogIn;

//html
//what state you need
//what functions you need
//where to place the functions
//where are you going to place this entire componenet? as an entire page or or a component within a page
