import { useRouter } from "next/router";
import logout from "./../component/logout";
import { Menu } from "@repo/ui/menu";
import axios from "axios";
import { useEffect, useState } from "react";
import { adminProfileAtom, courseStatusAtom, menuAtom } from "store";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import { Head } from "@repo/ui/header";
import FetchCourses from "../component/fetchCourse";
import CourseForm from "./../component/course";
import { loadingAtom } from "store";

interface AdminInfo {
  name: string;
  email: string;
  courses: number;
  publishedCourses: number;
}

export default function AdminHome() {
  const router = useRouter();
  const adminInfo = useRecoilValue(adminProfileAtom);
  const setAdminInfo = useSetRecoilState(adminProfileAtom);
  const menu = useRecoilValue(menuAtom);
  const setMenu = useSetRecoilState(menuAtom);
  const [courseStatus, setCourseStatus] = useRecoilState(courseStatusAtom);
  const setLoading = useSetRecoilState(loadingAtom);

  const getAdminProfile = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/me", {
        withCredentials: true,
      });
      const data = response.data;
      const adminData: AdminInfo = data.adminData;
      setAdminInfo(adminData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching admin profile:", error);
    }
  };

  const addCourseClick = () => {
    setLoading(true);
    setCourseStatus({ ...courseStatus, showForm: true, showCourse: false });
    setLoading(false);
  };

  useEffect(() => {
    getAdminProfile();
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
