const prisma = require("../db/db.js");
const { createFilterAndSortObj } = require("../helpers/helpers.js");

const getProducts = async (req, res, next) => {
  try {
    const queryParams = req.query;

    const filters = createFilterAndSortObj(queryParams);

    const products = await prisma.product.findMany({
      ...filters,
    });

    res.json(products);
  } catch (e) {
    next(e);
  }
};

const deleteProductById = async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await prisma.product.delete({
    where: { id: parseInt(id) },
  });

  res.json(deletedProduct);
};

const updateProductById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const fetchedProduct = await prisma.product.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    const { data } = req.body;

    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        ...fetchedProduct,
        ...data,
      },
    });

    res.json(updatedProduct);
  } catch (e) {
    next(e);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const { data } = req.body;

    if (!data.length) {
      return res.status(400).json({ error: "No products provided" });
    }

    const productsCreated = await prisma.product.createManyAndReturn({
      data,
    });

    res.json(productsCreated);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getProducts,
  deleteProductById,
  updateProductById,
  createProduct,
};
