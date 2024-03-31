import Image from "next/image";
import code from "./../../public/coding.png";
import { Landing } from "@repo/ui/home";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });
const content = {
  titleOne: " Welcome to CodeCraft!",
  titleTwo: "Master Web Development with Ease!",
  para: "Welcome to CodeCraft , Master the complete web development stack. From front-end technologies like HTML, CSS, and JavaScript to back-end frameworks like Node.js and Django, we've got it all covered.",
  paraTwo:
    "When you enroll at CodeCraft Pro, you're not just signing up for a course; you're joining a community driven by a passion for web development. Our instructors are not just educators; they are mentors, ready to guide you on a transformative journey.",
};

export default function Home() {
  const router = useRouter();
  return (
    <main className={`  `}>
      <div className="sm:w-[90%] md:w-[65%] mt-6 ml-6 md:ml-0 md:mt-0">
        <Image src={code} alt="code-icon" priority />
      </div>
      <Landing
        className={``}
        titleOne={content.titleOne}
        titleTwo={content.titleTwo}
        para={content.para}
        paraTwo={content.paraTwo}
        getStart={() => router.push("signup")}
      />
    </main>
  );
}
