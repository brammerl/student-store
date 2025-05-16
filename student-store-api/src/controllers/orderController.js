const prisma = require("../db/db.js");

const getAllOrders = async (req, res, next) => {
  try {
    const orders = await prisma.order.findMany();

    return res.json(orders);
  } catch (e) {
    next(e);
  }
};

const deleteOrderById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedOrder = await prisma.order.delete({
      where: { id: parseInt(id) },
    });

    res.json(deletedOrder);
  } catch (e) {
    next(e);
  }
};

module.exports = { getAllOrders, deleteOrderById };
