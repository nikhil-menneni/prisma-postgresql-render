import prisma from "../db";
export async function createUpdate(req, res) {
  const product = await prisma.product.findUnique({
    where: {
      id: req.body.productId,
    },
  });

  if (!product) {
    res.status(404).send({
      error: "Invalid Product",
    });
  }

  const created = await prisma.update.create({
    data: {
      ...req.body,
    },
  });

  res.send({ data: created });
}

export async function getAllUpdate(req, res) {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  const updates = [];
  products.map((el) => {
    updates.push(el.updates);
  });

  res.send({ data: updates });
}

export async function getUpdate(req, res) {
  const update = await prisma.update.findUnique({
    where: {
      id: req.params.id,
    },
  });
  res.send({ data: update });
}

export async function modifyUpdate(req, res) {
  const product = await prisma.product.findMany({
    where: {
      belongsTo: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  const updates = [];
  product.map((el) => {
    updates.push(el.updates);
  });

  const isValidUpdate = updates.find((el) => el.id === req.params.id);

  if (!isValidUpdate) {
    res.status(404).send({ error: "Update Not found" });
  }

  const updated = await prisma.update.update({
    where: {
      id: req.params.id,
    },
    data: {
      ...req.body,
    },
  });
  res.send({ data: updated });
}

export async function deleteUpdate(req, res) {
  const product = await prisma.product.findMany({
    where: {
      belongsTo: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  const updates = [];
  product.map((el) => {
    updates.push(el.updates);
  });

  const isValidUpdate = updates.find((el) => el.id === req.params.id);

  if (!isValidUpdate) {
    res.status(404).send({ error: "Update Not found" });
  }
  await prisma.update.delete({
    where: {
      id: req.params.id,
    },
  });
  res.send({ message: "deleted successfully" });
}
