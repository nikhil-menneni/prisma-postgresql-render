import prisma from "../db";
export const createUpdatePoints = async function (req, res) {
  const update = await prisma.update.findUnique({
    where: {
      id: req.body.productId,
    },
  });

  if (!update) {
    res.status(404).send({ message: "Invalid Update" });
  }

  const updatePoint = await prisma.updatePoints.create({
    data: {
      ...req.body,
    },
  });
};

export const getAllUpdatePoints = async function (req, res) {
  const updatePoints = await prisma.updatePoints.findMany({
    where: {
      id: req.body.id,
    },
  });
};

export const getUpdatePoint = async function (req, res) {
  const updatePoint = await prisma.updatePoints.findUnique({
    where: {
      id: req.params.id,
    },
  });
};

export const modifyUpdatePoints = async function (req, res) {
  const updated = await prisma.updatePoints.update({
    data: {
      ...req.body,
    },
    where: {
      id: req.params.id,
    },
  });
};

export const deleteUpdatePoint = async function (req, res) {
  await prisma.updatePoints.delete({
    where: {
      id: req.params.id,
    },
  });
};
