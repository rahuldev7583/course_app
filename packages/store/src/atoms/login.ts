import { atom } from "recoil";

export const loginState = atom({
  key: "loginState",
  default: {
    email: "",
    password: "",
  },
});
