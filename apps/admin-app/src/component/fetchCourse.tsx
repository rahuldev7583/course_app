import { CourseInput } from "common";
import Cookies from "js-cookie";
import axios from "axios";
import { useEffect } from "react";
import { adminProfileAtom, coursesAtom, courseStatusAtom } from "store";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import CourseForm from "./course";

interface ExtendedCourseInput extends CourseInput {
  id: number;
}

export default function FetchCourses() {
  const API_URL = process.env.API_URL;
  const courses: ExtendedCourseInput[] = useRecoilValue(coursesAtom);
  const setCourse = useSetRecoilState(coursesAtom);
  const [courseStatus, setCourseStatus] = useRecoilState(courseStatusAtom);
  const setAdminInfo = useSetRecoilState(adminProfileAtom);
  const adminInfo = useRecoilValue(adminProfileAtom);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${API_URL}/courses`, {
        withCredentials: true,
      });
      const data = response.data;
      const courseLength = data.courses.length;
      if (courseLength > 0) {
        setCourse(data.courses);
        const updatedCourses = data.courses;
        const updatedPublishedCourses = updatedCourses.filter(
          (course: CourseInput) => course.published
        );
        const updatedAdminInfo = {
          ...adminInfo,
          courses: updatedCourses.length,
          publishedCourses: updatedPublishedCourses.length,
        };
        setAdminInfo(updatedAdminInfo);
        setCourseStatus({ ...courseStatus });
      } else {
        setCourse(data.courses);
        const updatedCourses = data.courses;
        const updatedPublishedCourses = updatedCourses.filter(
          (course: CourseInput) => course.published
        );
        const updatedAdminInfo = {
          ...adminInfo,
          courses: updatedCourses.length,
          publishedCourses: updatedPublishedCourses.length,
        };
        setAdminInfo(updatedAdminInfo);
        setCourseStatus({ ...courseStatus });
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const publishedCourseClick = async (courseId: number, published: boolean) => {
    try {
      const courseToUpdate = courses.find((c) => c.id === courseId);
      if (!courseToUpdate) {
        console.error(`Course with ID ${courseId} not found.`);
        return;
      }
      const updatePayload = { published: published };
      const response = await axios.put(
        `${API_URL}/course/publish/${courseId}`,
        updatePayload,
        {
          withCredentials: true,
        }
      );
      const data = response.data;
      setCourseStatus({
        ...courseStatus,
        showCourse: true,
        publishCourse: false,
      });
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const deleteCourseClick = async (courseId: number) => {
    try {
      const response = await axios.delete(`${API_URL}/course/${courseId}`, {
        withCredentials: true,
      });
      const data = response.data;
      const updatedCourses = courses.filter((course) => course.id !== courseId);
      const updatedPublishedCourses = updatedCourses.filter(
        (course) => course.published
      );
      const updatedAdminInfo = {
        ...adminInfo,
        courses: updatedCourses.length,
        publishedCourses: updatedPublishedCourses.length,
      };
      setAdminInfo(updatedAdminInfo);
      setCourseStatus({ ...courseStatus, showCourse: true });
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="mt-8 md:mt-0 ml-12 pb-16 text-[#363960] md:grid md:grid-cols-4 md:w-[90%] z-0 relative">
      {courses.map((courseItem) => {
        return (
          <div
            className="mt-6 md:mt-3  w-[90%] border-4 border-[#363960]   rounded-2xl md:w-[75%]  md:ml-12 pt-3 pb-5 pl-2 pr-2 md:pl-0 md:pr-0"
            key={courseItem.id}
          >
            <img
              className=" w-[100%] rounded-xl md:w-[90%] md:ml-3 "
              src={courseItem.imageLink}
            />
            <h1 className="text-xl font-bold ml-4 mt-2 md:ml-4">
              {courseItem.title}
            </h1>
            <p className="text-lg ml-4 font-medium">{courseItem.description}</p>
            <p className="text-lg ml-4 font-medium">Rs {courseItem.price}</p>
            <div className="flex">
              <p className="text-lg ml-4 font-medium">
                {" "}
                {!courseItem.published ? "Publish" : "Make Private"}
              </p>
              <button
                className={`relative inline-flex flex-shrink-0 h-8 w-16 border-2 border-transparent rounded-full cursor-pointer transition-colors focus:outline-none ml-2${
                  courseItem.published ? " bg-[#363960]" : " bg-gray-400 "
                }`}
                onClick={() => {
                  setCourseStatus({
                    ...courseStatus,
                    showCourse: false,
                    publishCourse: !courseItem.published,
                  });
                  publishedCourseClick(courseItem.id, !courseItem.published);
                }}
              >
                <span className="sr-only">Toggle</span>
                <span
                  className={`absolute left-0 inline-block w-8 h-8 transform bg-white rounded-full shadow-lg transition-transform ${
                    courseItem.published ? "translate-x-full" : ""
                  }`}
                />
              </button>
            </div>
            <button
              className="mt-4 ml-12 md:ml-16 text-xl font-bold text-[#eaebf7] bg-[#363960] px-3 py-2 rounded-xl hover:text-[#363960] hover:bg-gray-300"
              onClick={() => {
                setCourseStatus({
                  ...courseStatus,
                  showCourse: false,
                });
                deleteCourseClick(courseItem.id);
              }}
            >
              Delete Course
            </button>
            <br />
            <button
              className="mt-4 ml-12 md:ml-16 text-xl font-bold  text-[#eaebf7] bg-[#363960] px-3 py-2 rounded-xl hover:text-[#363960] hover:bg-gray-300"
              onClick={() => {
                setCourseStatus({
                  publishCourse: false,
                  showCourse: false,
                  showForm: true,
                  updateCourse: true,
                  courseToUpdate: courseItem.id,
                });
              }}
            >
              Update Course
            </button>
          </div>
        );
      })}
      {courseStatus.showForm && <CourseForm />}
    </div>
  );
}
