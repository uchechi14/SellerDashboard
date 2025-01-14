import SideBar from "./components/dashboard/SideBar";

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center min-h-screen bg-[#F1EFE8] w-full ">
      <div className="w-[97%] flex overflow-hidden">
        <SideBar />
        <main className="w-[100%] px-5 flex-1 ml-60  max-md:ml-0">{children}</main>
      </div>
    </div>
  );
}
