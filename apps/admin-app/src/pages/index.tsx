import Image from "next/image";
import code from "./../../public/coding.png";
import { Landing } from "@repo/ui/home";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { loadingAtom } from "store";

const inter = Inter({ subsets: ["latin"] });
const content = {
  titleOne: " Welcome to CodeCraft Admin!",
  titleTwo: "Teach Web Development with Us!",
  para: "Welcome to CodeCraft Admin, where your creativity meets our cutting-edge platform to shape the future of web development education",
  paraTwo:
    "At CodeCraft Admin, we empower you to bring your vision to life. From structuring course content to designing engaging learning materials, our platform provides you with the flexibility and freedom to craft courses that reflect your expertise and passion for web development.",
};

export default function Home() {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingAtom);

  return (
    <main className={` z-0 `}>
      <div className="sm:w-[90%] md:w-[65%] mt-6 ml-6 md:ml-0 md:mt-0">
        <Image src={code} alt="code-icon" priority />
      </div>
      <Landing
        className={``}
        titleOne={content.titleOne}
        titleTwo={content.titleTwo}
        para={content.para}
        paraTwo={content.paraTwo}
        getStart={() => {
          setLoading(true);
          router.push("signup");
        }}
      />
    </main>
  );
}
