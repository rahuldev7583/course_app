import express from "express";
import adminRoutes from "./routes/admin";
import adminCourseRoutes from "./routes/adminCourse";
import userRoutes from "./routes/user";
import userCourseRoutes from "./routes/userCourse";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) {
  throw new Error(
    "SESSION_SECRET is not defined. Please set it in your .env file."
  );
}

// Middleware
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);
app.use(cookieParser()); // Required for parsing cookies
app.use(express.json());
app.use(
  session({
    secret: sessionSecret,
    resave: false, // Don't save session if unmodified
    saveUninitialized: false, // Don't create session until something is stored
    cookie: {
      secure: process.env.NODE_ENV === "production", // Set secure only in production
      httpOnly: true,
      sameSite: "lax",
    },
  })
);

declare module "express-session" {
  export interface SessionData {
    token?: string;
    userToken?: string;
    admin: { adminId: number };
    user: { userId: number };
  }
}

// Routes
app.get("/", (req, res) => {
  res.send("This is a course app.");
});

app.use("/admin", adminRoutes);
app.use("/admin", adminCourseRoutes);
app.use("/user", userRoutes);
app.use("/user", userCourseRoutes);

// Start server
app.listen(PORT, () => console.log(`Course app is running on port ${PORT}`));
