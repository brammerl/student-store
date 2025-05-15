const express = require("express");
const app = express();
const PORT = 3000;
const product = require("./routes/product.js");
const { Prisma } = require("@prisma/client");
const {
  PrismaClientValidationError,
} = require("@prisma/client/runtime/library");

app.use(express.json());

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
  }

  res.status(500).json({ error: "Internal Server Error" });
});

app.get("/", (req, res) => {
  res.send("hello world 3");
});

app.use("/product", product);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
