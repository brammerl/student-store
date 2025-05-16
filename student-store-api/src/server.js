const express = require("express");
const app = express();
const PORT = 3000;
const product = require("./routes/product.js");
const order = require("./routes/order.js");
const orderItem = require("./routes/orderItem.js");
const { Prisma } = require("@prisma/client");

app.use(express.json());
app.use("/product", product);
app.use("/order", order);
app.use("/orderItem", orderItem);

app.use((err, req, res, next) => {
  if (err instanceof Prisma.PrismaClientValidationError) {
    return res.status(400).json({ error: err.message });
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // Handle common Prisma errors (e.g., unique constraint violation)
    if (err.code === "P2002") {
      return res
        .status(400)
        .json({ error: "A unique constraint violation occurred." });
    }
    if (err.code === "P2025") {
      return res.status(400).json({ error: "Record not found" });
    }
  }

  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
