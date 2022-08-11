import { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Product from "./Product/Product";
import useStyles from "./styles";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import ProductsSideBar from "./ProductsSidebar/ProductsSideBar";

const sortQueryMap = {
  latest: orderBy("dateCreated", "asc"),
  "highest-price": orderBy("price", "desc"),
  "lowest-price": orderBy("price", "asc"),
  "a-z": orderBy("name", "asc"),
  "z-a": orderBy("name", "desc"),
};

const getFilterArr = (filterObj) => {
  const filterArr = [];
  for (const el in filterObj) {
    if (filterObj[el]) filterArr.push(el);
  }
  return filterArr;
};

const Products = ({ db, cart, setCart }) => {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState("latest");
  const [categoryFilter, setCategoryFilter] = useState({
    Hoodies: false,
    "T-Shirts": false,
  });
  const [collectionFilter, setCollectionFilter] = useState({
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
    const q = query(collection(db, "products"), sortQueryMap[sort]);
    const querySnapshot = await getDocs(q);
    const tempProducts = [];
    getFilterArr(categoryFilter);
    getFilterArr(collectionFilter);
    querySnapshot.forEach((doc) => {
      const product = doc.data();
      const categoryFilterArr = getFilterArr(categoryFilter);
      const collectionFilterArr = getFilterArr(collectionFilter);
      if (
        (categoryFilterArr.length === 0 ||
          categoryFilterArr.includes(product.category)) &&
        (collectionFilterArr.length === 0 ||
          collectionFilterArr.includes(product.collection))
      ) {
        tempProducts.push({ ...doc.data(), id: doc.id });
      }
    });
    setProducts(tempProducts);
  };

  useEffect(() => {
    getProducts();
  }, [sort, categoryFilter, collectionFilter]);

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
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          collectionFilter={collectionFilter}
          setCollectionFilter={setCollectionFilter}
        />
      </Box>
      <Box style={{ marginLeft: 200 }}>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Grid container justifyContent="center" spacing={4}>
            {products.map((product) => (
              <Grid item key={product.id} xs={12} md={6} lg={4} xl={3}>
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
