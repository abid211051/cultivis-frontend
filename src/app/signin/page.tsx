import AuthAnimateComponent from "@/src/components/siginup_In/authAnimateComponent";
import AuthUiComponent from "@/src/components/siginup_In/authuiComponent";
import { m_p_d } from "@/src/lib/globalVariabale";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function SignIn() {
  return (
    <div className={`${m_p_d} h-screen text-white relative`}>
      <div className="absolute top-4 right-8 z-20">
        <Link
          href={"/"}
          className="flex items-center p-2 bg-dark-accent rounded-xl"
        >
          <ChevronLeft className="size-5" />
          <span className="font-semibold">Home</span>
        </Link>
      </div>
      <div className="h-full flex gap-8">
        <div className="absolute flex flex-col items-center justify-center rounded-xl lg:sticky lg:w-[60%] lg:h-auto h-full w-full bg-[url(/bg_login.webp)] bg-cover">
          <AuthAnimateComponent />
        </div>
        <div className="z-10 flex-1 w-full flex flex-col items-center justify-center p-4">
          <AuthUiComponent />
        </div>
      </div>
    </div>
  );
}
