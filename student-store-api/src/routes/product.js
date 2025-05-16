const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController.js");

// Get all products, filter logic applied if provided
router.get("/", productController.getProducts);

// Delete product by id
router.delete("/:id", productController.deleteProductById);

// Update by ID
router.put("/:id", productController.updateProductById);

// Create product generic allows for multiple entries
router.post("/", productController.createProduct);

module.exports = router;
