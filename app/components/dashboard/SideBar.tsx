"use client"

import { RxDashboard } from "react-icons/rx";
import { LuGift } from "react-icons/lu";
import { BsBoxSeam } from "react-icons/bs";
import { HiOutlineCreditCard } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import Link from "next/link";
import { usePathname } from 'next/navigation'; 
const sideBarItems = [
    {
        name: 'Dashboard',
        href: '/',
        icon: RxDashboard,
    },
    {
        name: 'Orders',
        href: '/order',
        icon: LuGift,
    },
    {
        name: 'Products',
        href: '/product',
        icon: BsBoxSeam,
    },
    {
        name: 'Withdrawal',
        href: '/withdraw',
        icon: HiOutlineCreditCard,
    },
    {
        name: 'Settings',
        href: '/setting',
        icon: IoSettingsOutline,
    },
]
export default function SideBar(){

    const pathname = usePathname(); 

    return(
        <>
        <div className="w-[230px]  fixed bg-[#F1EFE8] max-md:hidden h-[100vh] border-r-[1px] border-r-[#D9D9D9] ">
        <div className="  mt-8 ">
            <div className="font-bold text-[25px] font-media-sans">CUBBY</div>
        </div>
        <div className="mt-6">
            <ul>
                {sideBarItems.map((item, index) =>(
                    <li key={index}
                     className={`flex items-center space-x-2 py-2  px-[10px] w-[150px] rounded-2xl  font-medium mt-3
                        ${pathname === item.href ? 'bg-gradient-to-r from-[#666666] to-[#000000] text-white' : ''}  
                     `}>
                    <Link href={item.href} className="flex items-center space-x-2">
                        <item.icon  className="text-[1.2rem]" />
                        <p className="text-[16px] font-Helevetica">{item.name}</p>
                    </Link>
                </li>
                ))}
            </ul>
        </div>
        </div>
        </>
    )
}