const { PrismaClient } = require("@prisma/client");
const express = require("express");
const prisma = new PrismaClient();
const router = express.Router();

router.get("/", async (req, res) => {
  const products = await prisma.product.findMany();

  res.json(products);
});

module.exports = router;
