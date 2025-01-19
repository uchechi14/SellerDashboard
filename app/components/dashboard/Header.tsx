import { IoSearch } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import Image from "next/image";
import profile from "../../../public/guy.jpeg"


    interface headerItems {
        title: string;
        note: string;

    }
  

export default function Header ({title, note} : headerItems) {
    return (
        <div className="flex justify-between items-center w-full mt-7 ">
            <div>
                <h1 className="font-normal font-Helevetica text-[29px]">{title}</h1>
                <p className="text-[13px]">{note}</p>
            </div>
            <div className="flex items-center gap-3">
                <div className="flex justify-center items-center">
                    <p className="relative left-7"><IoSearch /></p>
                    <input placeholder="Search" className="w-[200px] pl-8 outline-none py-[10px] rounded-[21px] bg-white text-[12px]"/>
                </div>
                <div className="w-[150px] rounded-[30px] py-[5px] gap-1 bg-white flex items-center justify-center">
                    <p className="text-[14px] font-medium">Agent ID:</p>
                    <p className="px-[10px] py-[5px] bg-[#E1E3FF] text-[12px] rounded-[20px] text-[#0171E3]">#425t72</p>
                </div>
                <div className="size-[30px] rounded-full bg-white justify-center items-center flex text-[20px]">
                    <IoMdNotificationsOutline />
                </div>
                <div className="size-[30px] rounded-full bg-white justify-center items-center flex text-[20px]">
                    <Image src={profile} className="size-full rounded-full" alt="profile"/>
                </div>
            </div>
        </div>
    )
}