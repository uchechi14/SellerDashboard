"use client";

import { RxDashboard } from "react-icons/rx";
import { LuGift } from "react-icons/lu";
import { BsBoxSeam } from "react-icons/bs";
import { HiOutlineCreditCard } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { TbLogout } from "react-icons/tb";
import { supabase } from "@/app/utils/superBaseClient";
const sideBarItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: RxDashboard,
  },
  {
    name: "Orders",
    href: "/order",
    icon: LuGift,
  },
  {
    name: "Products",
    href: "/product",
    icon: BsBoxSeam,
  },
  {
    name: "Withdrawal",
    href: "/withdraw",
    icon: HiOutlineCreditCard,
  },
  {
    name: "Settings",
    href: "/setting",
    icon: IoSettingsOutline,
  },
];

const SideBar = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }

      // After successful logout, redirect to login page
      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error.message);
      // Handle error (show error message to user)
    }
  };

  const pathname = usePathname();
  return (
    <>
      <div className="w-[220px] hidden lg:flex items-center flex-col justify-between left-0 top-0 px-[1rem]  fixed bg-[#F1EFE8]  h-[100vh] border-r-[1px] border-r-[#D9D9D9] py-6 ">
        <div className=" ">
          <div className="font-bold text-[25px] font-media-sans">CUBBY</div>
          <div className="mt-6">
            <ul>
              {sideBarItems.map((item, index) => (
                <li
                  key={index}
                  className={`flex items-center space-x-2 py-2  px-[10px] w-[150px] rounded-2xl  font-medium mt-3
                        ${
                          pathname === item.href
                            ? "bg-gradient-to-r from-[#666666] to-[#000000] text-white"
                            : ""
                        }  
                     `}
                >
                  <Link
                    href={item.href}
                    className="flex items-center space-x-2"
                  >
                    <item.icon className="text-[1.2rem]" />
                    <p className="text-[16px] font-Helevetica">{item.name}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="flex items-center gap-2 cursor-pointer  w-[150px] rounded-2xl text-[16px] font-Helevetica  font-medium space-x-2"
          onClick={handleLogout}
        >
          <TbLogout className="text-[1.2rem]" />
          Logout
        </div>
      </div>
    </>
  );
};

export default SideBar;
