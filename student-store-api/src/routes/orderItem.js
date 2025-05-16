const express = require("express");
const router = express.Router();
const orderItemController = require("../controllers/orderItemController");

router.get("/", orderItemController.getAllOrderItems);

module.exports = router;
