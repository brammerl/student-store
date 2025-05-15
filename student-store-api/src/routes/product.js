const { PrismaClient } = require("@prisma/client");
const express = require("express");
const prisma = new PrismaClient();
const router = express.Router();

router.get("/", (req, res) => {
  res.send("products");
});

module.exports = router;
