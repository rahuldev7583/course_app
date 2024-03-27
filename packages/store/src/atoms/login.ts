import { atom } from "recoil";

export const loginStateAtom = atom({
  key: "loginState",
  default: {
    email: "",
    password: "",
  },
});

export const loginStatusAtom = atom({
  key: "loginStatus",
  default: true,
});
