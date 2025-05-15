const express = require("express");
const app = express();
const PORT = 3000;
const product = require("./routes/product.js");

app.get("/", (req, res) => {
  res.send("hello world 3");
});

app.use("/product", product);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
