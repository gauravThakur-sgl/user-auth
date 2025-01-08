import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

interface DecodedToken {
 sub: string;
 exp: number;
}
export const requireAuth = async (
 req: Request,
 res: Response,
 next: NextFunction
) => {
 try {
  const token = req.headers.authorization?.split(" ")[1];

  if (!process.env.JWT_SECRET) {
   res.sendStatus(500);
   return;
  }

  if (!token) {
    res.sendStatus(401);
    return;
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET) as DecodedToken;

  if (Date.now() > decoded.exp * 1000) {
   res.sendStatus(401);
   return;
  }

  const user = await User.findById(decoded.sub);
  if (!user) {
   res.sendStatus(401);
   return;
  }

  Object.assign(req, { user: { id: user._id.toString() } });

  next();
 } catch (error) {
  res.sendStatus(401);
  return;
 }
};
