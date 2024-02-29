import { atom } from "recoil";

export const signupState = atom({
  key: "signupState",
  default: {
    username: "",
    email: "",
    password: "",
  },
});
