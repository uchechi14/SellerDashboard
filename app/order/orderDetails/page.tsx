import { BiSolidLeftArrow } from "react-icons/bi";
import detailImage from "../../../public/detailImage.png"
import Image from "next/image"
// import BaseLayout from "@/app/BaseLayout";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";

export default function OrderDetails() {
    return(
        <div className="w-full bg-white rounder-[20px] flex justify-center py-5 rounded-[20px]">
            <div className="w-[95%]">
                <Link href="/order">
                <div className="flex items-center text-[13px] gap-2"><BiSolidLeftArrow /> BACK TO PRODUCTS</div>
                </Link>
                <div className="w-[100%] rounded-[20px] bg-[#F1EFE8] flex justify-center py-[15px] mt-5">
                    <div className="w-[95%] flex gap-4 items-center justify-between">
                        <div className=" rounded-[35px]  w-[345px] aspect-square h-fit overflow-hidden flex flex-col items-center">
                            <Image src={detailImage} alt="image" className="w-full h-full object-cover " />
                            <div className="w-[132px] top-[-50px] relative py-2 flex items-center gap-1 justify-center rounded-[20px] bg-[#FFFFFF] bg-opacity-50">
                                <p className="text-[12px] font-medium relative">BUYER ID:</p>
                                <p className="px-[7px] py-[2px] bg-[#E1E3FF] text-[11px] rounded-[20px] text-[#0171E3]">#425t72</p>
                            </div>
                        </div>
                        <div className="">
                            <div>
                            <p className="text-[18px]">Item</p>
                            <p className="text-[14px]">Mens high neck black turtle polo shirt</p>
                            </div>
                            <div className="mt-3">
                            <p className="text-[17px] text-black opacity-[30%]">POLO</p>
                            <p className="text-[21px] font-semibold">₦30,000</p>
                            </div>
                            <div className="flex gap-4 items-center mt-3 ">
                                <div>
                                    <p className="text-[16px] font-normal mt-[-5px]">COLOR</p>
                                    <p className="size-[20px] rounded-full bg-[#D9D9D9]"></p>
                                </div>
                                <div>
                                    <p className="text-[16px] font-normal">SIZE</p>
                                    <p className="border border-black px-3 py-[1px] rounded-full">Small</p>
                                </div>
                                <div>
                                    <p className="text-[16px] font-normal">QTY</p>
                                    <p className="border border-black px-3 py-[1px] rounded-full">1PCS </p>
                                </div>
                            </div>
                            <div className="mt-5">
                            <p className="text-[16px] font-normal">Time of order</p>
                            <p className="text-[12px] font-normal">14 November 2024, 14:32:43</p>
                            </div>
                            <div className="mt-2">
                            <p className="text-[16px] font-normal">Buyer  address</p>
                            <p className="text-[12px] font-normal">ROYAL ILLA, IFITE, ANAMBRA. NIGERIA</p>
                            </div>
                        </div>
                        <div className="w-[306px] bg-white flex justify-center rounded-[35px] py-4">
                            <div className="w-[85%]">
                                <p className="text-[17px] font-semibold">TRACK PRODUCT</p>
                                {/* <div>
                                    <div className="flex flex-col items-center">
                                        <div className="size-[12px] rounded-full bg-[#14B8A6]"></div>
                                        <div className="border-r-[1px] border-[#14B8A6] h-[60px]"></div>
                                    </div>
                                    <div>
                                        <div className="size-[12px] rounded-full bg-[#14B8A6]"></div>
                                        <div className="border border-[#14B8A6] h-full"></div>
                                    </div>
                                    <div className="size-[12px] rounded-full bg-[#14B8A6]"></div>
                                </div> */}
                                <div className="mt-3 flex flex-col gap-[15px]">
                                    <div className="flex gap-3">
                                    <div className="flex flex-col items-center ">
                                        <div className="text-[12px] text-[#14B8A6]"><FaCheckCircle /></div>
                                        <div className="border-r-[1px] border-[#14B8A6] h-full "></div>
                                    </div>
                                    <div>
                                        <p className="text-[14px] font-semibold ">ORDER RECEIVED</p>
                                        <p className="text-[13px] text-black opacity-[30%] mt-2">14 November 2024, 14:32:43</p>
                                        <p className="text-[13px] text-black opacity-[30%]">TRACKING ID #54DED77F</p>
                                    </div>
                                    </div>
                                    <div className="flex gap-3">
                                    <div className="flex flex-col items-center ">
                                        <div className="text-[12px] text-[#14B8A6]"><FaCheckCircle /></div>
                                        <div className="border-r-[1px] border-[#14B8A6] h-full"></div>
                                    </div>
                                    <div>
                                    <p className="text-[14px] font-semibold ">PRODUCT SENT OUT</p>
                                    <p className="text-[13px] text-black opacity-[30%] mt-2">14 November 2024, 14:32:43</p>
                                    </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="text-[12px] text-[#14B8A6]"><FaCheckCircle /></div>
                                    <div>
                                    <p className="text-[14px] font-semibold ">ORDER DELIVERED</p>
                                    <p className="text-[13px] text-black opacity-[30%] mt-2">14 November 2024, 14:32:43</p>
                                    </div>
                                    </div>
                                </div>
                              <div className="flex mt-6">
                              <div className="w-[132px] py-2 flex items-center gap-1 justify-center rounded-[20px] bg-[#0171E308]">
                                <p className="text-[12px] font-medium">Product ID:</p>
                                <p className="px-[7px] py-[2px] bg-[#E1E3FF] text-[11px] rounded-[20px] text-[#0171E3]">#425t72</p>
                            </div>
                            <div className="w-[107px] py-2 bg-[#EDF6FF] text-[11px] rounded-full flex justify-center items-center">Awaiting completion</div>
                              </div>
                           </div>   
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}