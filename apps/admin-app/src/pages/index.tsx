import Image from "next/image";
import { Inter } from "next/font/google";
import { Card } from "@repo/ui/card";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={` ${inter.className}`}>
      <h1 className="text-2xl">course app</h1>
      <Card className="" title="coding" children="unlcok coding skill" />
    </main>
  );
}
