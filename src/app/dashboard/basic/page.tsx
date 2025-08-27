import MainComponent from "@/src/components/dashboard/basic/main/mainGridComponent";
import { m_p_d } from "@/src/lib/globalVariabale";

export default function BasicUserPage() {
  return (
    <div
      className={`max-h-screen flex flex-col gap-2 overflow-y-auto  ${m_p_d}`}
    >
      <h1 className="xl:block hidden shrink-0 pt-10 h-fit font-semibold text-[38px]">
        Welcome back <span className="text-gray-500">Pranto</span>
      </h1>
      <div className="xl:p-0 pt-[70px] grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-9 2xl:gap-4 xl:gap-6 gap-4 lg:overflow-hidden">
        <MainComponent />
      </div>
    </div>
  );
}
