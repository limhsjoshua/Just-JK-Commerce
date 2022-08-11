//layout for one specfic product
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import useStyles from "./styles";

import React from "react";

const Product = ({ product, addToCart }) => {
  const classes = useStyles();

  const { name, price, photo, description } = product;

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image={photo} title={name} />
      <CardContent>
        <div className={classes.cardContent}>
          <Typography
            variant="h5"
            gutterBottom
            style={{ fontFamily: "Merriweather", fontWeight: 900 }} //change font here
          >
            {name}
          </Typography>
          <Typography variant="h5" style={{ fontFamily: "Merriweather" }}>
            {price}
          </Typography>
        </div>
        <Typography
          variant="body2"
          color="textSecondary"
          style={{ fontFamily: "Merriweather" }}
        >
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <IconButton aria-label="Add to Cart" onClick={handleAddToCart}>
          <AddShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Product;
