import { Signup } from "@repo/ui/signup";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { signupStateAtom } from "store";
import { SignupInput } from "common";
import axios from "axios";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export default function SignupUser() {
  const router = useRouter();
  const API_URL = process.env.API_URL;

  const signupState = useRecoilValue(signupStateAtom);
  const setSignupState = useSetRecoilState(signupStateAtom);

  const loginLoad = () => router.push("login");

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setSignupState({
      ...signupState,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(signupState);
    const validation = SignupInput.safeParse(signupState);

    if (validation.success) {
      const response = await axios.post(`${API_URL}/signup`, signupState);
      const data = response.data;
      console.log(data);
      console.log("Form is valid:", signupState);

      Cookies.set("token", data.token);

      router.push("user");
    } else {
      console.error("Validation errors:");
    }
  };

  return (
    <div>
      <Signup
        type="Signup"
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        username={signupState.username}
        email={signupState.email}
        password={signupState.password}
        loginPath={loginLoad}
      />
    </div>
  );
}
