import { AddCourse } from "@repo/ui/addCourse";
export default function Home() {
  const authToken = localStorage.getItem("token");

  return (
    <div>
      <AddCourse />
    </div>
  );
}
