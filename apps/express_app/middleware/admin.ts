import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface Admin {
  adminId: number;
}

interface MyJwtPayload extends jwt.JwtPayload {
  admin?: Admin;
}

interface CustomRequest extends Request {
  admin?: Admin;
}

const fetchAdmin = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.header("token");
  // console.log(token);

  if (!token) {
    console.log("error from middleware");

    res.status(401).send({ error: "Authentication failed" });
  } else {
    try {
      const secretKey = process.env.SECRET_KEY as jwt.Secret;
      const data = jwt.verify(token, secretKey) as MyJwtPayload;
      // req.admin = data.admin;
      req.session.admin = data.admin;
      next();
    } catch (error) {
      console.log("error from middleware");
      console.log(error);
      res.status(401).send({ error: "Authentication failed" });
    }
  }
};

export default fetchAdmin;
