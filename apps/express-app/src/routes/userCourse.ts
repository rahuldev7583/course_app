import { PrismaClient } from "@prisma/client";
import fetchUser from "../../middleware/user";
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
  const user = req.session.user;
  try {
    if (!user) {
      console.log(user);
      res.status(403).json({ message: "Error occured" });
    } else {
      const courses = await prisma.course.findMany({
        where: {
          published: true,
        },
        include: {
          admin: {
            select: {
              name: true,
            },
          },
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
        const userId = req.session.user?.userId;
        const updateUser = await prisma.user.update({
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
        const userData = await prisma.user.findUnique({
          where: { id: userId },
          select: {
            name: true,
            email: true,
            purchasedCourses: true,
            isVerified: false,
            password: false,
          },
        });
        res.json({ message: "Course added to purchasedCourses", userData });
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
      const userId = req.session.user?.userId;
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
