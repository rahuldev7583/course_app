import { Head } from "@repo/ui/header";
import { Menu } from "@repo/ui/menu";
import { menuAtom, userProfileAtom } from "store";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import logout from "./../component/logout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Course from "../component/course";
import { loadingAtom } from "store";

interface UserInfo {
  name: string;
  email: string;
  purchasedCourses: number;
}

export default function User() {
  const API_URL = process.env.API_URL;
  const router = useRouter();
  const [menu, setMenu] = useRecoilState(menuAtom);
  const [userInfo, setUserInfo] = useRecoilState(userProfileAtom);
  const setLoading = useSetRecoilState(loadingAtom);

  const getUserProfile = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/me", {
        withCredentials: true,
      });
      const data = response.data;
      const userData: UserInfo = data.userData;
      setUserInfo(userData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <div>
      <Head />

      <Menu
        type="user"
        menuStatus={menu}
        menuClicked={() => setMenu(true)}
        closeClicked={() => setMenu(false)}
        logout={logout(router, "login")}
        profile={userInfo}
      />
      <Course />
    </div>
  );
}
