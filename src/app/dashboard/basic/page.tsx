import MainComponent from "@/src/components/dashboard/basic/main/mainGridComponent";
import { m_p_d } from "@/src/lib/globalVariabale";

export default function BasicUserPage() {
  return (
    <div className={`max-h-screen flex flex-col overflow-y-auto  ${m_p_d}`}>
      <h1 className="shrink-0 h-fit font-semibold pt-10  xl:text-[38px] text-[32px]">
        Welcome back <span className="text-gray-500">Pranto</span>
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-9 gap-4 lg:overflow-hidden">
        <MainComponent />
      </div>
    </div>
  );
}
