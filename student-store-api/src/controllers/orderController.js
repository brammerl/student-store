const prisma = require("../db/db.js");

const getAllOrders = async (req, res) => {
  const orders = await prisma.order.findMany();

  return res.json(orders);
};

module.exports = { getAllOrders };
