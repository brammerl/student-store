const express = require("express");
const router = express.Router();
const orderItemController = require("../controllers/orderItemController");

// Get all order items
router.get("/", orderItemController.getAllOrderItems);

// Create a new order item
router.post("/", orderItemController.createOrderItem);

// Get an order item by id
router.get("/:id", orderItemController.getOrderItemById);

// Delete an order item by id
router.put("/:id", orderItemController.updateOrderItemById);

module.exports = router;
