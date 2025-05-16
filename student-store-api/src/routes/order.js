const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// Get all orders
router.get("/", orderController.getAllOrders);

// Delete order by id
router.delete("/:id", orderController.deleteOrderById);

// Update order by id
router.put(":/id", orderController.updateOrderById);

// Create order - generic creates one or multiple
router.post("/", orderController.createOrder);

module.exports = router;
