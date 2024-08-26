import { Signup } from "@repo/ui/signup";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { signupStateAtom } from "store";
import { SignupInput } from "common";
import axios from "axios";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { loadingAtom } from "store";

export default function SignupUser() {
  const router = useRouter();
  const API_URL = process.env.API_URL;

  const signupState = useRecoilValue(signupStateAtom);
  const setSignupState = useSetRecoilState(signupStateAtom);
  const setLoading = useSetRecoilState(loadingAtom);

  const loginLoad = () => {
    setLoading(true);
    router.push("login");
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setSignupState({
      ...signupState,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const validation = SignupInput.safeParse(signupState);

    if (validation.success) {
      try {
        const response = await axios.post(`${API_URL}/signup`, signupState);
        if (response.status === 200) {
          const data = response.data;
          // console.log("Form is valid:", signupState);
          Cookies.set("userToken", data.userToken);
          router.push("user");
        } else {
          setLoading(false);
          console.error({ "Response errors": response });
          router.replace("signup");
        }
      } catch (error: any) {
        setLoading(false);
        if (error.response && error.response.status === 403) {
          console.error("Access forbidden:", error.response.data);
          // Handle the 403 error (e.g., show an error message to the user)
        } else {
          console.error("An unexpected error occurred:", error);
        }
        router.replace("signup");
      }
    } else {
      setLoading(false);
      console.error("Validation errors:");
      router.replace("signup");
    }
  };

  useEffect(() => {
    setLoading(false);
  }, []);

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
