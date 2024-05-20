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
app.use(cookieParser()); // Required for parsing cookies
declare module "express-session" {
  export interface SessionData {
    token?: string;
    userToken?: string;
    admin: { adminId: number };
    user: { userId: number };
  }
}
if (!sessionSecret) {
  throw new Error(
    "SESSION_SECRET is not defined. Please set it in your .env file."
  );
}

app.use(
  session({
    secret: sessionSecret, // Replace with a secure random string
    resave: true, // Don't save session if unmodified
    saveUninitialized: true, // Create session when data is stored
    cookie: { secure: true, httpOnly: true, sameSite: "lax" }, // Set secure and httpOnly flags for enhanced security
  })
);
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("This is a course app.");
});

app.use("/admin", adminRoutes);
app.use("/admin", adminCourseRoutes);
app.use("/user", userRoutes);
app.use("/user", userCourseRoutes);

app.listen(PORT, () => console.log(`Course app is running on port ${PORT}`));
