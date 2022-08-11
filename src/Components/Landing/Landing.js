import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./Landing.css";

const Landing = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <div className="glitch">
        <h1 className="diff-font">
          Just
          <br />
          JK
        </h1>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Link to="/products" style={{ textDecoration: "none" }}>
          <Button
            className="black-button"
            style={{
              backgroundColor: "black",
              color: "white",
              padding: "5px 45px",
            }}
            type={"submit"}
          >
            Shop Now
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
