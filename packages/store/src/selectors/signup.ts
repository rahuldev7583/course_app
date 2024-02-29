import { selector } from "recoil";
import { signupState } from "../atoms/signup";
import { SignupInput } from "common";

export const formValidationState = selector({
  key: "formValidationState",
  get: ({ get }) => {
    const formData = get(signupState);
    return SignupInput.safeParse(formData);
  },
});
