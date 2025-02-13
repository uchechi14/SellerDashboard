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
  console.log(sideOpen);

  return (
    <div className="flex lg:flex-row justify-between items-center w-full mt-7 flex-col tablet:items-start">
      <div className="  lg:w-fit w-full justify-between flex">
        <div>
          <h1 className="font-normal font-Helevetica text-[29px]">{title}</h1>
          <p className="text-[13px]">{note}</p>
        </div>
        <div
          className="lg:hidden  flex text-[30px] cursor-pointer"
          onClick={menuOpen}
        >
          <GiHamburgerMenu />
        </div>
      </div>
      {searchOpen ? (
        <div className="w-full flex items-center tablet:mt-5 mobileSm:hidden">
          <p
            onClick={handleOpen}
            className="size-[30px] rounded-full bg-white justify-center items-center flex text-[20px]"
          >
            <IoIosArrowRoundBack />
          </p>
          <div className="w-[100%]">
            <input className="w-full border-b outline-none border-b-[#E1E3FF] pl-8  py-[10px] rounded-[21px]  text-[12px]" />
          </div>
        </div>
      ) : (
        <div className={`flex items-center gap-3 tablet:mt-5 tablet:w-full tablet:justify-between mobile:flex $`}>
          <div className="flex justify-center items-center mobile:hidden tablet:w-[50%]">
            <p className="relative left-7">
              <IoSearch />
            </p>
            <input
              placeholder="Search"
              className={`w-[100%] pl-8 outline-none transition ease-in-out duration-300 py-[10px] rounded-[21px] bg-white text-[12px] tablet:w-full ${searchOpen ?"translate-x-0" : "-translate-x-full"}`}
            />
          </div>
          <div className="w-[150px] rounded-[30px] py-[5px] gap-1 bg-white flex items-center justify-center">
            <p className="text-reponsiveText font-medium">Agent ID:</p>
            <p className="px-[10px] py-[5px] bg-[#E1E3FF] text-[12px] tablet:text-[10px] rounded-[20px] text-[#0171E3]">
              #425t72
            </p>
          </div>
          <p
            className="size-[30px] rounded-full bg-white justify-center items-center flex text-[20px] mobileSm:hidden"
            onClick={handleOpen}
          >
            <IoSearch />
          </p>
          <div className="size-[30px] rounded-full bg-white justify-center items-center flex text-[20px]">
            <IoMdNotificationsOutline />
          </div>
          <div className="size-[39px] rounded-full bg-white justify-center items-center flex text-[20px]">
            <Image
              src={profile}
              className="size-full rounded-full"
              alt="profile"
            />
          </div>
        </div>
      )}

      {sideOpen && (
        <Mobile_header sideBarItems={sideBarItems} setSideOpen={setSideOpen} />
      )}
    </div>
  );
}
