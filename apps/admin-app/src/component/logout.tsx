import axios from "axios";

export default function logout(router: any, path: string) {
  return () => {
    const API_URL = process.env.API_URL;

    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    axios
      .post(`${API_URL}/logout`)
      .then((response) => {
        if (response.status === 200) {
          router.push(`${path}`);
          return;
        } else {
          console.error("Failed to logout");
          return;
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        return;
      });
  };
}
