import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const comparePasswords = (password, hash) => {
  return bcrypt.compare(password, hash);
};

export const hashPassword = (password) => {
  return bcrypt.hash(password, 5);
};
//salt:extra variable that gives u a differnt hash(making a hard hash to decode)

export const createJWT = (user) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET
  );
  return token;
};

export const protect = (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    return handleError(res, "Invalid Token");
  }

  const [, token] = bearer.split(" ");
  if (!token) {
    return handleError(res, "Invalid Token");
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error: any) {
    return handleError(res, "Unauthorized");
  }
};

function handleError(res, message) {
  res.status(401).json({ message });
}
