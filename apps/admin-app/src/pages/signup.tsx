import { Signup } from "@repo/ui/signup";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { signupState } from "store";
import { SignupInput } from "common";
import axios from "axios";
import { useRouter } from "next/router";

export default function SignupAdmin() {
  const router = useRouter();
  const API_URL = process.env.API_URL;

  const signupStateData = useRecoilValue(signupState);
  const setSignupStateData = useSetRecoilState(signupState);

  const loginLoad = () => router.push("login");

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setSignupStateData({
      ...signupStateData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(signupStateData);
    const validation = SignupInput.safeParse(signupStateData);

    if (validation.success) {
      const response = await axios.post(`${API_URL}/signup`, signupStateData);
      const data = response.data;
      console.log(data);
      console.log("Form is valid:", signupStateData);
      localStorage.setItem("token", data.token);
      router.push("admin");
    } else {
      console.error("Validation errors:");
    }
  };

  return (
    <div>
      <Signup
        type="Signup as Admin"
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        username={signupStateData.username}
        email={signupStateData.email}
        password={signupStateData.password}
        loginPath={loginLoad}
      />
    </div>
  );
}
