import express from "express";
import adminRoutes from "./routes/admin";
import adminCourseRoutes from "./routes/adminCourse";
import userRoutes from "./routes/user";
import userCourseRoutes from "./routes/userCourse";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("This is a course app.");
});

app.use("/admin", adminRoutes);
app.use("/admin", adminCourseRoutes);
app.use("/user", userRoutes);
app.use("/user", userCourseRoutes);

app.listen(PORT, () => console.log(`Course app is running on port ${PORT}`));
