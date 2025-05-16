const prisma = require("../db/db.js");

const getAllOrderItems = async (req, res, next) => {
  try {
    const orderItems = await prisma.orderItem.findMany({
      include: {
        product: true,
        order: true,
      },
    });

    res.json(orderItems);
  } catch (e) {
    next(e);
  }
};

const deleteOrderById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedOrderItem = await prisma.orderItem.delete({
      where: { id: parseInt(id) },
    });

    res.json(deletedOrderItem);
  } catch (e) {
    next(e);
  }
};

const getOrderById = (module.exports = { getAllOrderItems, deleteOrderById });
