import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return <div className="bg-sign-in min-h-screen min-w-screen flex items-center justify-center">
    <SignIn />;
  </div>
}