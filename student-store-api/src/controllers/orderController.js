const prisma = require("../db/db.js");

const getAllOrders = async (req, res, next) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        orders: true,
      },
    });

    return res.json(orders);
  } catch (e) {
    next(e);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await prisma.order.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        orderItems: true,
      },
    });

    res.json(order);
  } catch (e) {
    next(e);
  }
};

const deleteOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedOrder = await prisma.order.delete({
      where: { id: parseInt(id) },
    });

    res.json(deletedOrder);
  } catch (e) {
    next(e);
  }
};

const updateOrderById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const fetchedOrder = await prisma.order.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    const { data } = req.body;

    const updatedOrder = await prisma.order.update({
      where: { id: parseInt(id) },
      data: {
        ...fetchedOrder,
        ...data,
      },
    });

    res.json(updatedOrder);
  } catch (e) {
    next(e);
  }
};

const createOrder = async (req, res, next) => {
  try {
    const { data } = req.body;

    if (!data.length) {
      return res.status(400).json({ error: "No orders provided" });
    }

    const ordersCreated = await prisma.order.createManyAndReturn({
      data,
    });

    res.json(ordersCreated);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAllOrders,
  deleteOrderById,
  updateOrderById,
  createOrder,
  getOrderById,
};
