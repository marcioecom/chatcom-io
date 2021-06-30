import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authToken = req.headers.authorization

  if (!authToken) {
    return res.status(401).end()
  }

  const token = authToken.split(' ')[1]

  try {
    const { sub } = verify(token, process.env.SECRET) as IPayload

    req.user_id = sub

    next()
  } catch (error) {
    return res.status(401).end()
  }
}
