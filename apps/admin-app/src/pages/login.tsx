import { Login } from "@repo/ui/login";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { loginState } from "store";
import { LoginInput } from "common";
import axios from "axios";
import { useRouter } from "next/router";

export default function LoginAdmin() {
  const router = useRouter();
  const API_URL = process.env.API_URL;

  const loginStateData = useRecoilValue(loginState);
  const setLoginStateData = useSetRecoilState(loginState);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setLoginStateData({
      ...loginStateData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(loginStateData);
    const validation = LoginInput.safeParse(loginStateData);

    if (validation.success) {
      const response = await axios.post(`${API_URL}/login`, loginStateData);
      const data = response.data;
      console.log(data);
      console.log("Form is valid:", loginStateData);
      localStorage.setItem("token", data.token);
      router.push("admin");
    } else {
      console.error("Validation errors:");
    }
  };
  return (
    <div>
      <Login
        type="Login as Admin"
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        email={loginStateData.email}
        password={loginStateData.password}
      />
    </div>
  );
}
