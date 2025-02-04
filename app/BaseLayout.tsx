import SideBar from "./components/dashboard/SideBar";

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center min-h-screen bg-[#F1EFE8]  w-full ">
      <div className="w-full relative lg:pl-[225px]   flex ">
        <SideBar />
        <main className="w-full  flex-1 lg:px-[2rem] px-[4%]  ">
          {children}
        </main>
      </div>
    </div>
  );
}
