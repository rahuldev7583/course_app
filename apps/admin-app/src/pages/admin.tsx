import { useRouter } from "next/router";
import logout from "./../component/logout";
import { Menu } from "@repo/ui/menu";
import Cookies from "js-cookie";
import axios from "axios";
import { useEffect, useState } from "react";
import { adminProfileAtom, courseStatusAtom, menuAtom } from "store";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import { Head } from "@repo/ui/header";
import FetchCourses from "../component/fetchCourse";
import CourseForm from "./../component/course";

interface AdminInfo {
  name: string;
  email: string;
  courses: number;
  publishedCourses: number;
}

export default function AdminHome() {
  const API_URL = process.env.API_URL;
  const router = useRouter();
  const adminInfo = useRecoilValue(adminProfileAtom);
  const setAdminInfo = useSetRecoilState(adminProfileAtom);
  const menu = useRecoilValue(menuAtom);
  const setMenu = useSetRecoilState(menuAtom);
  const [courseStatus, setCourseStatus] = useRecoilState(courseStatusAtom);
  const [loading, setLoading] = useState(true);

  const getAdminProfile = async () => {
    try {
      const response = await axios.get(`${API_URL}/me`, {
        withCredentials: true,
      });
      const data = response.data;
      const adminData: AdminInfo = data.adminData;
      setAdminInfo(adminData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const addCourseClick = () => {
    setCourseStatus({ ...courseStatus, showForm: true, showCourse: false });
  };
  useEffect(() => {
    getAdminProfile();
  }, []);

  return (
    <div className="">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Menu
            type="admin"
            menuStatus={menu}
            menuClicked={() => setMenu(true)}
            closeClicked={() => setMenu(false)}
            logout={logout(router, "login")}
            profile={adminInfo}
          />

          <Head />
          {!courseStatus.showForm && (
            <button
              className="text-2xl font-bold ml-[25%] mt-4 text-[#eaebf7] bg-[#363960] px-4 py-2 rounded-xl md:ml-[48%] hover:bg-gray-200 hover:text-[#363960]"
              onClick={addCourseClick}
            >
              Add Course
            </button>
          )}

          {courseStatus.showCourse && <FetchCourses />}

          {courseStatus.showForm && <CourseForm />}
        </>
      )}
    </div>
  );
}
