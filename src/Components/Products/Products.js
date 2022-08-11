import { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Product from "./Product/Product";
import useStyles from "./styles";
import { collection, getDocs } from "firebase/firestore";
import ProductsSideBar from "./ProductsSidebar/ProductsSideBar";

const Products = ({ db, cart, setCart }) => {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState("latest");
  const [filter, setFilter] = useState({
    Hoodies: false,
    "T-Shirts": false,
    "Localhost vs. Production": false,
    "Following Tutorial Code": false,
    "7 Hours Debugging": false,
    "Merging Branches": false,
    "RAM Then vs. Now": false,
    "Learn Python in 5 Min": false,
    "Programming is Easy": false,
    "In Case of Fire": false,
    "Sad Code Cat": false,
    "It's a Feature": false,
  });

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
    <Box style={{}}>
      <Box
        style={{
          marginTop: 100,
          padding: 10,
          width: 200,
          float: "left",
        }}
      >
        <ProductsSideBar
          sort={sort}
          setSort={setSort}
          filter={filter}
          setFilter={setFilter}
        />
      </Box>
      <Box style={{ marginLeft: 200 }}>
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
      </Box>
    </Box>
  );
};

export default Products;
