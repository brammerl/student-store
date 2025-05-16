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

module.exports = { getAllOrderItems };
