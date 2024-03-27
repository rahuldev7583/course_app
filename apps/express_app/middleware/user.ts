import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface User {
  userId: number;
}

interface MyJwtPayload extends jwt.JwtPayload {
  user?: User;
}

interface CustomRequest extends Request {
  user?: User;
}

const fetchUser = (req: CustomRequest, res: Response, next: NextFunction) => {
  // const token = req.header("token");
  const token = req.cookies.token; // Assuming the token is stored in a cookie named "token"
  if (!token) {
    res.status(401).send({ error: "Authentication failed" });
  } else {
    try {
      const secretKey = process.env.SECRET_KEY as jwt.Secret;
      const data = jwt.verify(token, secretKey) as MyJwtPayload;
      req.user = data.user;
      next();
    } catch (error) {
      console.log("error from middleware");
      console.log(error);
      res.status(401).send({ error: "Authentication failed" });
    }
  }
};

export default fetchUser;
