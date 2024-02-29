import express, { Request, Response } from "express";
import * as bcryptjs from "bcryptjs";
import { LoginInput, SignupInput } from "common";
import { PrismaClient } from "@prisma/client";
import * as jwt from "jsonwebtoken";
import fetchAdmin from "./../../middleware/admin";

interface Admin {
  adminId: number;
}
interface CustomRequest extends Request {
  admin?: Admin;
}

const prisma = new PrismaClient();
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Signup or Login as admin");
});

router.get("/me", fetchAdmin, async (req: CustomRequest, res: Response) => {
  const admin = req.admin;
  if (!admin) {
    res.status(403).json({ message: "Error occured" });
  } else {
    const adminData = await prisma.admin.findUnique({
      where: { id: admin.adminId },
    });
    console.log(adminData);
    res.json({ adminData });
  }
});

router.post("/signup", async (req, res) => {
  let parsedInput = SignupInput.safeParse(req.body);
  if (!parsedInput.success) {
    res.status(403).json({ message: "Error occured" });
  } else {
    let adminData = parsedInput.data;

    try {
      const exitingAdmin = await prisma.admin.findUnique({
        where: {
          email: adminData.email,
        },
      });
      if (exitingAdmin) {
        console.log(exitingAdmin);
        res.status(403).json({ message: "Admin already exits" });
      }
      const salt = await bcryptjs.genSalt(10);
      const secPassword = await bcryptjs.hash(adminData.password, salt);
      const createdAdmin = await prisma.admin.create({
        data: {
          name: adminData.username,
          email: adminData.email,
          password: secPassword,
        },
      });
      const secretKey = process.env.SECRET_KEY;
      const payload = {
        admin: {
          adminId: createdAdmin.id,
        },
      };

      if (!secretKey) {
        console.error("SECRET_KEY is not defined.");
        res.status(500).json({ message: "Internal server error" });
      } else {
        const token = jwt.sign(payload, secretKey, { expiresIn: "2h" });
        console.log(createdAdmin);
        res.json({ message: "Successfully SignedUp as Admin", token });
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
    let adminData = parsedInput.data;

    try {
      const exitingAdmin = await prisma.admin.findUnique({
        where: {
          email: adminData.email,
        },
      });
      if (!exitingAdmin) {
        return res.status(400).send("Login with correct email");
      } else if (
        !(await bcryptjs.compare(adminData.password, exitingAdmin.password))
      ) {
        return res.status(400).send("Login with correct password");
      }
      const secretKey = process.env.SECRET_KEY;
      const payload = {
        admin: {
          adminId: exitingAdmin.id,
        },
      };

      if (!secretKey) {
        console.error("SECRET_KEY is not defined.");
        res.status(500).json({ message: "Internal server error" });
      } else {
        const token = jwt.sign(payload, secretKey, { expiresIn: "2h" });
        res.json({ message: "Successfully LoggedIn as Admin", token });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
});

export default router;
