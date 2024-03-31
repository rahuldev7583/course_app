import express from "express";
import adminRoutes from "./routes/admin";
import adminCourseRoutes from "./routes/adminCourse";
import userRoutes from "./routes/user";
import userCourseRoutes from "./routes/userCourse";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
const app = express();
const PORT = process.env.PORT || 8000;

declare module "express-session" {
  export interface SessionData {
    token?: string;
    admin: { adminId: number };
    user: { userId: number };
  }
}

app.use(cookieParser()); // Required for parsing cookies

app.use(
  session({
    secret: "secretKey", // Replace with a secure random string
    resave: false, // Don't save session if unmodified
    saveUninitialized: true, // Create session when data is stored
    cookie: { secure: true, httpOnly: true }, // Set secure and httpOnly flags for enhanced security
  })
);

app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("This is a course app.");
});

app.use("/admin", adminRoutes);
app.use("/admin", adminCourseRoutes);
app.use("/user", userRoutes);
app.use("/user", userCourseRoutes);

app.listen(PORT, () => console.log(`Course app is running on port ${PORT}`));
