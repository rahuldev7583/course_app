import express, { Request, Response } from "express";
import * as bcryptjs from "bcryptjs";
import { LoginInput, SignupInput } from "common";
import { PrismaClient } from "@prisma/client";
import * as jwt from "jsonwebtoken";
import fetchUser from "./../../middleware/user";

interface User {
  userId: number;
}
interface CustomRequest extends Request {
  user?: User;
}

const prisma = new PrismaClient();
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Signup or Login as User");
});

router.get("/me", fetchUser, async (req: CustomRequest, res: Response) => {
  const user = req.session.user;
  if (!user) {
    res.status(403).json({ message: "Error occured" });
  } else {
    const data = await prisma.user.findUnique({
      where: { id: user.userId },
      select: {
        name: true,
        email: true,
        purchasedCourses: true,
        isVerified: false,
        password: false,
      },
    });
    const userData = {
      ...data,
      purchasedCourses: data?.purchasedCourses.length,
    };
    res.json({ userData });
  }
});

router.post("/signup", async (req, res) => {
  let parsedInput = SignupInput.safeParse(req.body);
  if (!parsedInput.success) {
    res.status(403).json({ message: "Error occured" });
  } else {
    let userData = parsedInput.data;

    try {
      const exitinguser = await prisma.user.findUnique({
        where: {
          email: userData.email,
        },
      });
      if (exitinguser) {
        console.log(exitinguser);
        res.status(403).json({ message: "user already exits" });
      }
      const salt = await bcryptjs.genSalt(10);
      const secPassword = await bcryptjs.hash(userData.password, salt);
      const createduser = await prisma.user.create({
        data: {
          name: userData.username,
          email: userData.email,
          password: secPassword,
        },
      });
      const secretKey = process.env.SECRET_KEY;
      const payload = {
        user: {
          userId: createduser.id,
        },
      };

      if (!secretKey) {
        console.error("SECRET_KEY is not defined.");
        res.status(500).json({ message: "Internal server error" });
      } else {
        const token = jwt.sign(payload, secretKey, { expiresIn: "2h" });
        res.json({ message: "Successfully SignedUp as user", token });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
});

router.post("/login", async (req, res) => {
  let parsedInput = LoginInput.safeParse(req.body);
  if (!parsedInput.success) {
    res.status(403).json({ message: "Error occured" });
  } else {
    let userData = parsedInput.data;

    try {
      const exitinguser = await prisma.user.findUnique({
        where: {
          email: userData.email,
        },
      });
      if (!exitinguser) {
        return res.status(400).send("Login with correct email");
      } else if (
        !(await bcryptjs.compare(userData.password, exitinguser.password))
      ) {
        return res.status(400).send("Login with correct password");
      }
      const secretKey = process.env.SECRET_KEY;
      const payload = {
        user: {
          userId: exitinguser.id,
        },
      };

      if (!secretKey) {
        console.error("SECRET_KEY is not defined.");
        res.status(500).json({ message: "Internal server error" });
      } else {
        const token = jwt.sign(payload, secretKey, { expiresIn: "2h" });
        res.json({ message: "Successfully LoggedIn as user", token });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
});


router.post("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        res.status(500).send("Error");
      } else {
        res.clearCookie("token"); // Clear the token cookie
        res.sendStatus(200); // Send success response
      }
    });
  } else {
    res.sendStatus(200); // No session, already logged out
  }
});

export default router;
