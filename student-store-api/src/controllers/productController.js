const prisma = require("../db/db.js");
const { createFilterAndSortObj } = require("../helpers/helpers.js");

const getProducts = async (req, res) => {
  const queryParams = req.query;

  const filters = createFilterAndSortObj(queryParams);

  const products = await prisma.product.findMany({
    ...filters,
  });

  res.json(products);
};

const deleteProductById = async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await prisma.product.delete({
    where: { id: parseInt(id) },
  });

  res.json(deletedProduct);
};

const updateProductById = async (req, res) => {
  const { id } = req.params;

  const fetchedProduct = await prisma.product.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!fetchedProduct) {
    return res.status(404).json({ error: "No product found" });
  }

  const { data } = req.body;

  const updatedProduct = await prisma.product.update({
    where: { id: parseInt(id) },
    data: {
      ...fetchedProduct,
      ...data,
    },
  });

  res.json(updatedProduct);
};

const createProduct = async (req, res) => {
  const { data } = req.body;

  if (!data.length) {
    return res.status(400).json({ error: "No products provided" });
  }

  const productsCreated = await prisma.product.createManyAndReturn({
    data,
  });

  res.json(productsCreated);
};

module.exports = {
  getProducts,
  deleteProductById,
  updateProductById,
  createProduct,
};
