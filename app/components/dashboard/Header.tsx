"use client";
import { IoSearch } from "react-icons/io5";
import { IoIosArrowRoundBack, IoMdNotificationsOutline } from "react-icons/io";
import Image from "next/image";
import profile from "../../../public/guy.jpeg";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxDashboard } from "react-icons/rx";
import { LuGift } from "react-icons/lu";
import { BsBoxSeam } from "react-icons/bs";
import { HiOutlineCreditCard } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import Mobile_header from "./mobile_header";

const sideBarItems = [
  {
    name: "Dashboard",
    href: "/",
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

interface headerItems {
  title: string;
  note: string;
}

export default function Header({ title, note }: headerItems) {
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [sideOpen, setSideOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setSearchOpen(!searchOpen);
  };

  const menuOpen = () => {
    setSideOpen(!sideOpen);
  };

  return (
    <div className="w-full px-4 py-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-normal font-Helevetica">
              {title}
            </h1>
            <p className="text-sm text-gray-600">{note}</p>
          </div>
          <button
            className="lg:hidden text-2xl"
            onClick={menuOpen}
            aria-label="Toggle menu"
          >
            <GiHamburgerMenu />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          {searchOpen ? (
            <div className="flex items-center gap-2 w-full">
              <button
                onClick={handleOpen}
                className="p-2 bg-white rounded-full hover:bg-gray-50"
                aria-label="Back"
              >
                <IoIosArrowRoundBack className="text-xl" />
              </button>
              <input
                className="w-full px-4 py-2 border-b border-b-[#E1E3FF] outline-none rounded-xl text-sm"
                placeholder="Search..."
                type="search"
              />
            </div>
          ) : (
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <div className="hidden sm:flex items-center bg-white rounded-xl px-4 py-2 flex-1 lg:w-64">
                <input
                  placeholder="Search"
                  className="w-full outline-none text-sm"
                  type="search"
                />
                <IoSearch className="text-gray-500" />
              </div>

              <div className="flex items-center bg-white rounded-full px-3 py-1.5 gap-2">
                <span className="text-sm font-medium">Agent ID:</span>
                <span className="px-2 py-1 bg-[#E1E3FF] text-[#0171E3] text-xs rounded-full">
                  #425t72
                </span>
              </div>

              <button
                className="sm:hidden p-2 bg-white rounded-full hover:bg-gray-50"
                onClick={handleOpen}
                aria-label="Search"
              >
                <IoSearch className="text-xl" />
              </button>

              <button
                className="p-2 bg-white rounded-full hover:bg-gray-50"
                aria-label="Notifications"
              >
                <IoMdNotificationsOutline className="text-xl" />
              </button>

              <div className="w-10 h-10 rounded-full overflow-hidden bg-white">
                <Image
                  src={profile}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {sideOpen && (
        <Mobile_header sideBarItems={sideBarItems} setSideOpen={setSideOpen} />
      )}
    </div>
  );
}
