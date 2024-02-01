import { CourseInput } from "common";
import { PrismaClient } from "@prisma/client";
import fetchAdmin from "./../../middleware/admin";
import express, { Request, Response } from "express";

const router = express.Router();
const prisma = new PrismaClient();

interface Admin {
  adminId: number;
}
interface CustomRequest extends Request {
  admin?: Admin;
}

router.get(
  "/courses",
  fetchAdmin,
  async (req: CustomRequest, res: Response) => {
    const admin = req.admin;
    if (!admin) {
      res.status(403).json({ message: "Error occured" });
    } else {
      const courses = await prisma.course.findMany({
        where: {
          adminId: admin.adminId,
        },
      });
      console.log(courses);
      res.json({ courses });
    }
  }
);

router.post(
  "/course",
  fetchAdmin,
  async (req: CustomRequest, res: Response) => {
    let parsedInput = CourseInput.safeParse(req.body);
    if (!parsedInput.success) {
      res.status(403).json({ message: "Error occured" });
    } else {
      const course = parsedInput.data;
      const admin = req.admin;

      try {
        if (!admin) {
          res.status(403).json({ message: "Error occured" });
        } else {
          const createdCourse = await prisma.course.create({
            data: {
              title: course.title,
              description: course.description,
              price: course.price,
              imageLink: course.imageLink,
              adminId: admin.adminId,
            },
          });
          console.log(createdCourse);
          res.send("Course created");
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }
);

router.put(
  "/course/:id",
  fetchAdmin,
  async (req: CustomRequest, res: Response) => {
    let parsedInput = CourseInput.safeParse(req.body);
    if (!parsedInput.success) {
      res.status(403).json({ message: "Error occured" });
    } else {
      try {
        const newCourse = parsedInput.data;
        const courseId = parseInt(req.params.id, 10);
        const course = await prisma.course.findUnique({
          where: {
            id: courseId,
          },
        });
        if (!course) {
          res.status(400).send("Course doesn't exit");
        } else {
          const updatedCourse = await prisma.course.update({
            where: {
              id: courseId,
            },
            data: {
              title: newCourse.title,
              description: newCourse.description,
              imageLink: newCourse.imageLink,
              price: newCourse.price,
              published: newCourse.published,
            },
          });
          res.json({ message: "Course updated successfully", updatedCourse });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }
);

export default router;
