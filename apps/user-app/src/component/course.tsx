import axios from "axios";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  courseInputAtom,
  coursesAtom,
  courseStatusAtom,
  purchaseCourseAtom,
  userProfileAtom,
} from "store";
import { CourseInput } from "common";
import { useEffect, useState } from "react";

interface ExtendedCourseInput extends CourseInput {
  id: number;
}
interface UserInfo {
  name: string;
  email: string;
  purchasedCourses: number;
}

export default function Course() {
  const courses: ExtendedCourseInput[] = useRecoilValue(coursesAtom);
  const setCourse = useSetRecoilState(coursesAtom);
  const [userInfo, setUserInfo] = useRecoilState(userProfileAtom);
  const setPurchaseCourse = useSetRecoilState(purchaseCourseAtom);
  const purchaseCourse: ExtendedCourseInput[] =
    useRecoilValue(purchaseCourseAtom);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("/api/course", {
        withCredentials: true,
      });
      const purchaseCourseRes = await axios.get("/api/purchasedcourse", {
        withCredentials: true,
      });
      const data = response.data;
      const purchaseCourseData = purchaseCourseRes.data.purchasedCourses;
      setCourse(data.courses);
      setPurchaseCourse(purchaseCourseData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const purchaseCourseClick = async (courseId: number) => {
    setLoading(true);
    try {
      const response = await axios.post(`/api/course/${courseId}`, null, {
        withCredentials: true,
      });
      const data = response.data;
      const userData = data.userData;
      const updatedPurchaseCourse = userData.purchasedCourses;
      setUserInfo({
        ...userData,
        purchasedCourses: userData.purchasedCourses.length,
      });
      setPurchaseCourse(updatedPurchaseCourse);
      setLoading(false);
    } catch (error) {
      console.error("Error purchasing course:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="mt-8 md:mt-10 ml-12 pb-16 text-[#363960] md:grid md:grid-cols-4 md:w-[90%] z-0 relative">
      {loading ? (
        <p>Loading...</p>
      ) : (
        courses.map((courseItem) => {
          return (
            <div
              key={courseItem.id}
              className="mt-6 md:mt-3  w-[90%] border-4 border-[#363960]   rounded-2xl md:w-[75%] md:ml-12 pt-3 pb-5 pl-2 pr-2 md:pl-0 md:pr-0"
            >
              <img
                className=" w-[100%] rounded-xl md:w-[90%] md:ml-3 "
                src={courseItem.imageLink}
              />
              <h1 className="text-xl font-bold ml-4 mt-2 md:ml-4">
                {courseItem.title}
              </h1>
              <p className="text-lg ml-4 font-medium">
                {courseItem.description}
              </p>
              <p className="text-lg ml-4 font-medium">Rs {courseItem.price}</p>
              <button
                className="mt-4 ml-12 md:ml-16 text-xl font-bold text-[#eaebf7] bg-[#363960] px-3 py-2 rounded-xl hover:text-[#363960] hover:bg-gray-300"
                onClick={() => {
                  if (
                    purchaseCourse.find((course) => course.id === courseItem.id)
                  ) {
                    console.log("Already purchased");
                  } else {
                    purchaseCourseClick(courseItem.id);
                  }
                }}
              >
                {purchaseCourse.find((course) => course.id === courseItem.id)
                  ? "Purchased"
                  : "Buy Now"}
              </button>
            </div>
          );
        })
      )}
    </div>
  );
}
