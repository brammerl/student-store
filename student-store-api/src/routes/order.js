const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// Get all orders
router.get("/", orderController.getAllOrders);

// Delete order by id
router.delete("/:id", orderController.deleteOrderById);

module.exports = router;
