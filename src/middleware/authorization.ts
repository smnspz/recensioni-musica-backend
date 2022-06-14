import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"]?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).send({ error: "Access denied" });
  }

  try {
    jwt.verify(token, process.env.JWT_TOKEN_KEY!);
    next();
  } catch (e) {
    res.status(401).send({ error: "Invalid token" });
  }
};

export default checkAuth;
