import { string, z } from "zod";

export const SignupInput = z.object({
  username: string().min(3).max(20).default(""),
  email: string().email().min(8).max(25).default(""),
  password: string().min(5).max(10).default(""),
});

export type SignupInputType = z.infer<typeof SignupInput>;

export const LoginInput = z.object({
  email: string().min(8).max(25).default(""),
  password: string().min(5).max(10).default(""),
});

export type LoginInputType = z.infer<typeof LoginInput>;

export const CourseInput = z.object({
  title: string().min(4).max(25).default(""),
  description: string().min(5).max(40).default(""),
  price: z
    .number()
    .nullable()
    .default(null)
    .refine((value) => value === null || (value >= 10 && value <= 10000000), {
      message: "Price must be null or a number between 10 and 10,000,000",
    }),
  imageLink: string().default(""),
  published: z.boolean().default(false),
});

export type CourseInput = z.infer<typeof CourseInput>;
