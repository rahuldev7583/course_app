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
    price: null,
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
    courseToUpdate: null,
    publishCourse: false,
  },
});
