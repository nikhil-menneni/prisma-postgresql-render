import prisma from "../db";

export const getProducts = async (req, res) => {
  const { id } = req.user;
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    include: {
      products: true,
    },
  });

  res.send({ data: user.products });
};

export const getProduct = async (req, res) => {
  const product = await prisma.product.findUnique({
    where: {
      id: req.params.id,
      belongsToId: req.user.id, //indexing
    },
  });

  res.send({ data: product });
};

export const createProduct = async (req, res) => {
  const product = await prisma.product.create({
    data: { name: req.body.name, belongsToId: req.user.id },
  });

  res.send({ data: product });
};

export const updateProduct = async (req, res) => {
  await prisma.product.findUniqueOrThrow({
    where: {
      id: req.params.id,
    },
  });

  const product = await prisma.product.update({
    where: {
      id: req.params.id,
    },
    data: {
      name: req.body.name,
    },
  });

  res.send({ data: product });
};

export const deleteProduct = async (req, res) => {
  await prisma.product.delete({
    where: {
      id: req.params.id,
      belongsToId: req.user.id, //indexing
    },
  });

  res.send({ message: "deleted successfully" });
};
