const express = require("express");
const router = express.Router();
const orderItemController = require("../controllers/orderItemController");

router.get("/", orderItemController.getAllOrderItems);

router.get("/:id", orderItemController.getOrderItemById);

router.put("/:id", orderItemController.updateOrderItemById);

router.post("/:id", orderItemController.createOrderItem);

module.exports = router;
