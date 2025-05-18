import jwt, { JwtPayload } from "jsonwebtoken";
import userSchema from "../database/schemas/user.schema.js";
import { Request, Response, NextFunction } from "express";

interface DecodedToken extends JwtPayload {
  id: string;
}
export const checkIfUserLogged = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const cookie = req.cookies["jwt"];

    if (!cookie) {
      return res.status(400).send({ success: false, message: "User not logged in!" });
    }
    if(!process.env['JWT_SECRET']){
      return res.status(400).send({ success: false, message: "User not logged in!" });
    }

    const decodeCookie = jwt.verify(cookie, process.env['JWT_SECRET'] ) as DecodedToken;

    if (!decodeCookie || !decodeCookie["userId"]) {
      return res.status(400).send({ success: false, message: "User not logged in!" });
    }
    const user = await userSchema.findById(decodeCookie["userId"]);
    if (!user || !user.id) {
      return res.status(400).send({ success: false, message: "User not logged in!" });
    }

    req.params['userId'] = user._id.toString();
    next();
  }
  catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    }
  }
}