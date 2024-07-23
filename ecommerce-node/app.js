const express = require("express");
require("./db/mongoose");

const app = express();
const PORT = process.env.PORT;
const userRouter = require("./routers/user");
const itemRouter = require("./routers/item");
const cartRouter = require("./routers/cart");

app.use(express.json());
app.use(userRouter);
app.use(itemRouter);
app.use(cartRouter);

app.get("/", function (req, res) {
  res.send("Hello, World");
});

app.listen(PORT, function () {
  console.log("Server listening on port" + PORT);
});
