import SideBar from "./components/dashboard/SideBar";

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center min-h-screen bg-[#F1EFE8] w-full ">
      <div className="w-[97%] flex justify-center">
        <SideBar />
        <main className="w-full px-5">{children}</main>
      </div>
    </div>
  );
}
