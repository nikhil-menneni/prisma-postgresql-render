import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../utils/auth";

export async function createNewUser(req, res, next) {
  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: await hashPassword(req.body.password),
      },
    });

    const token = createJWT(user);
    res.json({ token });
  } catch (error: any) {
    error.type = "input";
    next(error);
  }
}

export async function signIn(req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res
      .status(400)
      .send({ message: "Username or Password is required" });
  }

  const user = await prisma.user.findUnique({
    where: { username: req.body.username },
  });

  if (!user) {
    return res.status(400).send({ message: "Invalid Username" });
  }

  const isValid = await comparePasswords(req.body.password, user.password);

  if (!isValid) {
    return res.status(400).send({ message: "Invalid password" });
  }

  const token = createJWT(user);
  res.json({ token });
}
