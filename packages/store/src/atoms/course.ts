import { atom } from "recoil";

export const coursesAtom = atom({
  key: "courses",
  default: [],
});

export const courseInputAtom = atom({
  key: "courseInput",
  default: {
    title: "",
    description: "",
    price: 0,
    published: false,
    imageLink: "",
  },
});

export const courseStatusAtom = atom({
  key: "courseStatus",
  default: {
    showForm: false,
    showCourse: true,
    updateCourse: false,
    courseToUpdate: 0,
    publishCourse: false,
  },
});
