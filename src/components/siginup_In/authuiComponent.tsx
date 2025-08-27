import AuthButtonComponent from "./authButtonComponent";
import AuthFormComponent from "./authFormComponent";
import Image from "next/image";

export default function AuthUiComponent() {
  return (
    <div className="lg:w-full flex flex-col gap-2 sm:w-[500px] w-full p-4 lg:bg-white lg:text-black text-white bg-white/10 backdrop-blur-2xl rounded-xl">
      <Image
        src={"/CultiVis.png"}
        alt="logo"
        width={80}
        height={80}
        priority
        className="rounded-md xl:block hidden mx-auto"
      />
      <AuthFormComponent />
      <div className="flex items-center justify-center">
        <div className="flex-1 h-[1px] bg-gray-400"></div>
        <p className="w-fit px-2">Or continue with</p>
        <div className="flex-1 h-[1px] bg-gray-400"></div>
      </div>
      <div className="flex flex-wrap gap-2 justify-between">
        <AuthButtonComponent>
          <Image
            src={"/google.png"}
            alt="Google"
            width={25}
            height={25}
            priority
            className="mx-auto"
          />
        </AuthButtonComponent>
        <AuthButtonComponent>
          <Image
            src={"/facebook.png"}
            alt="Facebook"
            width={25}
            height={25}
            priority
            className="mx-auto"
          />
        </AuthButtonComponent>
      </div>
    </div>
  );
}
