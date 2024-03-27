import { atom } from "recoil";

export const signupStateAtom = atom({
  key: "signupState",
  default: {
    username: "",
    email: "",
    password: "",
  },
});
