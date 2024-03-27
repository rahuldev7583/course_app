import { atom } from "recoil";

export const adminProfileAtom = atom({
  key: "adminProfile",
  default: {
    name: "",
    email: "",
    courses: 0,
    publishedCourses: 0,
  },
});

export const menuAtom = atom({
  key: "menu",
  default: false,
});
