import { atom } from "recoil";

export const userProfileAtom = atom({
  key: "userProfile",
  default: {
    name: "",
    email: "",
    purchasedCourses: 0,
  },
});

export const purchaseCourseAtom = atom({
  key: "purchaseCourse",
  default: [],
});
