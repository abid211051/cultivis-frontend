import AuthAnimateComponent from "@/src/components/siginup_In/authAnimateComponent";
import AuthUiComponent from "@/src/components/siginup_In/authuiComponent";
import { m_p_d } from "@/src/lib/globalVariabale";

export default async function SignIn() {
  return (
    <div className={`${m_p_d} flex-1 flex gap-8 relative`}>
      <div className="absolute flex flex-col items-center justify-center rounded-xl lg:sticky lg:w-[60%] lg:h-auto h-full w-full bg-[url(/bg_login.webp)] bg-cover">
        <AuthAnimateComponent />
      </div>
      <div className="z-10 flex-1 w-full flex flex-col items-center justify-center p-4">
        <AuthUiComponent />
      </div>
    </div>
  );
}
