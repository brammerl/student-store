const { PrismaClient } = require("@prisma/client");
const express = require("express");
const prisma = new PrismaClient();
const router = express.Router();

// Get all product
router.get("/", async (_, res) => {
  const products = await prisma.product.findMany();

  res.json(products);
});

// Delete product by id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await prisma.product.delete({
    where: { id: parseInt(id) },
  });

  res.json(deletedProduct);
});

// Update by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  const fetchedProduct = await prisma.product.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!fetchedProduct) {
    return res.status(404).json({ error: "No product found" });
  }

  const { data } = req.body;

  const updatedProduct = await prisma.product.update({
    where: { id: parseInt(id) },
    data: {
      ...fetchedProduct,
      ...data,
    },
  });

  res.json(updatedProduct);
});

module.exports = router;
