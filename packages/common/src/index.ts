import { string, z } from "zod";

export const SignupInput = z.object({
  username: string().min(3).max(10),
  email: string().min(8).max(20),
  password: string().min(5).max(10),
});

export type SignupInputType = z.infer<typeof SignupInput>;

export const LoginInput = z.object({
  email: string().min(8).max(20),
  password: string().min(5).max(10),
});

export type LoginInputType = z.infer<typeof LoginInput>;

export const CourseInput = z.object({
  title: string(),
  description: string(),
  price: z.number(),
  imageLink: string(),
  published: z.boolean().default(false),
});

export type CourseInput = z.infer<typeof CourseInput>;
