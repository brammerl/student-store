const express = require("express");
const router = express.Router();
const orderItemController = require("../controllers/orderItemController");

router.get("/", orderItemController.getAllOrderItems);

router.delete("/:id", orderItemController.deleteOrderById);
module.exports = router;
