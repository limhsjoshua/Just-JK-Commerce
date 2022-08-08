import { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Product from "./Product/Product";
import useStyles from "./styles";
import { collection, getDocs } from "firebase/firestore";

const Products = ({ db, cart, setCart }) => {
  const classes = useStyles();
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const tempProducts = [];
    querySnapshot.forEach((doc) => {
      tempProducts.push({ ...doc.data(), id: doc.id });
    });
    setProducts(tempProducts);
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    // if product is already in cart, increase quantity
    if (cart.find((item) => item.id === product.id)) {
      const newCart = cart.map((item) => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      setCart(newCart);
    } else {
      // else add product to cart with quantity = 1
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justify="center" spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id}>
            <Product product={product} addToCart={addToCart} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default Products;
