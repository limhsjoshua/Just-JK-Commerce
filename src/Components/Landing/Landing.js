import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./Landing.css";

const Landing = () => {
  return (
    <>
      <div className="glitch">
        <h1>
          Just
          <br />
          JK
        </h1>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
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
    </>
  );
};

export default Landing;
