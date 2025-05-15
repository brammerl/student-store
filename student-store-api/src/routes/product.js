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

module.exports = router;
