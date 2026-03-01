import { Metadata } from "next";
import { Inter } from "next/font/google";
import '../globals.css'

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Threads",
    description: "A nextJs 14 meta Threads application",
  };
const inter = Inter({ subsets: ["latin"] });

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <>
      {children}
    </>
  )
}

export default layout