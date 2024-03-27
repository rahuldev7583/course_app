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

export default function AdminHome() {
  const API_URL = process.env.API_URL;
  const router = useRouter();
  const adminInfo = useRecoilValue(adminProfileAtom);
  const setAdminInfo = useSetRecoilState(adminProfileAtom);
  const menu = useRecoilValue(menuAtom);
  const setMenu = useSetRecoilState(menuAtom);
  const [courseStatus, setCourseStatus] = useRecoilState(courseStatusAtom);

  const getAdminInfo = async () => {
    console.log("getAdminInfo");

    try {
      const authToken = Cookies.get("token");
      const config = {
        headers: {
          token: authToken,
        },
      };
      const response = await axios.get(`${API_URL}/me`, config);
      const data = response.data;
      setAdminInfo(data.adminData);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const addCourseClick = () => {
    console.log("addCourseClicked");
    setCourseStatus({ ...courseStatus, showForm: true, showCourse: false });
    console.log(courseStatus);
  };
  useEffect(() => {
    getAdminInfo();
  }, []);

  return (
    <div className="">
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
    </div>
  );
}
