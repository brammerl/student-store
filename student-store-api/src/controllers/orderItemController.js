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

const getOrderItemById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await prisma.orderItem.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        product: true,
        order: true,
      },
    });

    res.json(order);
  } catch (e) {
    next(e);
  }
};

const updateOrderItemById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const fetchedOrderItem = await prisma.orderItem.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    const { data } = req.body;

    const updatedOrderItem = await prisma.orderItem.update({
      where: { id: parseInt(id) },
      data: {
        ...fetchedOrderItem,
        ...data,
      },
    });

    res.json(updatedOrderItem);
  } catch (e) {
    next(e);
  }
};

const createOrderItem = async (req, res, next) => {
  try {
    const { data } = req.body;

    if (!data.length) {
      return res.status(400).json({ error: "No order items provided" });
    }

    const orderItemsCreated = await prisma.orderItem.createManyAndReturn({
      data,
    });

    res.json(orderItemsCreated);
  } catch (e) {
    next(e);
  }
};

const getOrderById = (module.exports = {
  getAllOrderItems,
  getOrderItemById,
  updateOrderItemById,
  createOrderItem,
});
