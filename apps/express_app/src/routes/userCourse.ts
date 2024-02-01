import { PrismaClient } from "@prisma/client";
import fetchUser from "./../../middleware/user";
import express, { Request, Response } from "express";

const router = express.Router();
const prisma = new PrismaClient();

interface User {
  userId: number;
}
interface CustomRequest extends Request {
  user?: User;
}

router.get("/courses", fetchUser, async (req: CustomRequest, res: Response) => {
  const user = req.user;
  try {
    if (!user) {
      res.status(403).json({ message: "Error occured" });
    } else {
      const courses = await prisma.course.findMany({
        where: {
          published: true,
        },
      });

      res.json({ courses });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post(
  "/course/:id",
  fetchUser,
  async (req: CustomRequest, res: Response) => {
    try {
      const courseId = parseInt(req.params.id, 10);
      const course = await prisma.course.findUnique({
        where: {
          id: courseId,
        },
      });
      if (!course) {
        res.status(400).send("Course doesn't exit");
      } else {
        const userId = req.user?.userId;
        const updatedUser = await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            purchasedCourses: {
              connect: {
                id: courseId,
              },
            },
          },
        });

        res.json({ message: "Course added to purchasedCourses", updatedUser });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.get(
  "/purchasedcourses",
  fetchUser,
  async (req: CustomRequest, res: Response) => {
    try {
      const userId = req.user?.userId;
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          purchasedCourses: true,
        },
      });
      const purchasedCourses = user?.purchasedCourses;
      res.json({ purchasedCourses });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default router;
