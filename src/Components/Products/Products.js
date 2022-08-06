import React from "react";
import { Grid } from "@material-ui/core/Grid";
import Product from "../Product";

const products = [
  { id: 1, name: "Table", description: "Wooden table", price: "$700.00" },
  { id: 2, name: "Lamp", description: "Table lamp", price: "$90.00" },
  { id: 3, name: "Sofa", description: "Leather sofa", price: "$3000.00" },
];

const Products = () => {
  return (
    <main>
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
