import { Login } from "@repo/ui/login";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { loginStateAtom, loginStatusAtom } from "store";
import { LoginInput } from "common";
import axios from "axios";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export default function LoginAdmin() {
  const router = useRouter();
  const API_URL = process.env.API_URL;

  const loginState = useRecoilValue(loginStateAtom);
  const setLoginState = useSetRecoilState(loginStateAtom);
  const loginStatus = useRecoilValue(loginStatusAtom);
  const setLoginStatus = useSetRecoilState(loginStatusAtom);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setLoginState({
      ...loginState,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = LoginInput.safeParse(loginState);

    if (validation.success) {
      try {
        const response = await axios.post(`${API_URL}/login`, loginState);
        if (response.status === 200) {
          setLoginStatus(true);
          const data = response.data;
          // console.log("Form is valid:", loginState);
          Cookies.set("userToken", data.userToken);
          router.push("user");
        } else {
          console.log("Unexpected response status:", response.status);
          setLoginStatus(false);
          router.push("/login");
        }
      } catch (error) {
        console.error("Error occurred:", error);
        setLoginStatus(false);
        router.push("/login");
      }
    } else {
      console.error("Validation errors:");
    }
  };

  return (
    <div>
      <Login
        loginStatus={loginStatus}
        type="Login"
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        email={loginState.email}
        password={loginState.password}
      />
    </div>
  );
}
