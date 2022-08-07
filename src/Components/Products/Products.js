import React from "react";
import { Grid } from "@material-ui/core";
import Product from "./Product/Product";
import useStyles from "./styles";

const products = [
  {
    id: 1,
    name: "Table",
    description: "Wooden table",
    price: "$700.00",
    image:
      "https://www.collinsdictionary.com/images/full/table_588358070_1000.jpg",
  },
  {
    id: 2,
    name: "Lamp",
    description: "Table lamp",
    price: "$90.00",
    image:
      "https://cdn.ambientedirect.com/chameleon/mediapool/thumbs/e/14/Artemide_Choose-Tavolo-Tischleuchte_1200x630-ID1244137-6b26b748c53db9143ef4cc7a64deb941.jpg",
  },
  {
    id: 3,
    name: "Sofa",
    description: "Leather sofa",
    price: "$3000.00",
    image:
      "https://res.cloudinary.com/blackorchid-technologies/image/upload/Geormani-3-Seater-Etchout-359",
  },
];

const Products = () => {
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justify="center" spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default Products;
