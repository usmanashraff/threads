import { ClerkProvider } from "@clerk/nextjs";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import '../globals.css'
export const metadata: Metadata = {
    title: "Threads",
    description: "A nextJs 14 meta Threads application",
  };
const inter = Inter({ subsets: ["latin"] });

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <ClerkProvider>
        <html lang="en">
            <body className={`${inter.className} bg-dark-1`}>
                <main>{children}</main>
            </body>
        </html>
    </ClerkProvider>
  )
}

export default layout