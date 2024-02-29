import Image from "next/image";
import code from "./../../public/coding.png";
import { Landing } from "@repo/ui/home";
import { Inter } from "next/font/google";
import { Signup } from "@repo/ui/signup";

const inter = Inter({ subsets: ["latin"] });

const content = {
  titleOne: " Welcome to CodeCraft!",
  titleTwo: "Master Web Development with Ease!",
  para: "Our instructors will guide you through practical, real world projects. Get ready to roll up your sleeves and dive into the code.",
  paraTwo:
    "In the fast-paced world of web development, staying current is crucial. Our instructors are at the forefront of the industry, continuously updating their skills to bring you the latest trends, tools, and technologies.",
};

export default function Home() {
  return (
    <main className={`  `}>
      <div className="sm:w-[90%] md:w-[65%] mt-8 ml-6 md:ml-0 md:mt-0">
        <Image src={code} alt="code-icon" priority />
      </div>
      <Landing
        className={``}
        titleOne={content.titleOne}
        titleTwo={content.titleTwo}
        para={content.para}
        paraTwo={content.paraTwo}
        getStart={() => console.log("start")}
      />
    </main>
  );
}
