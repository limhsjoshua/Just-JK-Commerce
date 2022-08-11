// This is your test secret API key.

const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51LUvptI1KsvTidgjDMiZEVrJR9uoOVfLhLBVSc2ghRUWOSZ3qVmVQE8p3Cpr2ZBzw1alhnZCbs2IQ13f3a4UjhlQ004aYtGL17"
);
const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const methodOverride = require("method-override");

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(methodOverride("_method"));

const YOUR_DOMAIN = "http://localhost:3000";

app.post("/generate-jwt", async (req, res) => {
  const payload = { user: req.body.user };
  const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: "1 day",
  });
  res.cookie("loginToken", token, {
    httpOnly: true,
  });
  res.set({});
  res.send({ token: token });
});

app.get("/check-jwt", async (req, res) => {
  const { loginToken } = req.cookies;
  jwt.verify(loginToken, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.send({ user: null });
    res.send({ user: user });
  });
});

app.delete("/delete-jwt", (_, res) => {
  res.clearCookie("loginToken");
  res.send({ logout: true });
});

app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price_data: {
          unit_amount: req.body.price,
          currency: "sgd",
          product: "prod_MDMh9fbpEaZhx6",
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}/orders?success=true&order=${req.body.order.id}`,
    cancel_url: `${YOUR_DOMAIN}/orders?cancelled=true&order=${req.body.order.id}`,
  });

  console.log(session);

  res.send(session.url);
});

app.listen(4242, () => console.log("Running on port 4242"));
