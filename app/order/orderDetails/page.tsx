import { BiSolidLeftArrow } from "react-icons/bi";
import detailImage from "../../../public/detailImage.png"
import Image from "next/image"
import BaseLayout from "@/app/BaseLayout";
import Link from "next/link";

export default function OrderDetails() {
    return(
        <BaseLayout>
        <div className="w-full bg-white rounder-[20px] flex justify-center">
            <div className="w-[90%]">
                <Link href="/order">
                <div className="flex items-center"><BiSolidLeftArrow /> BACK TO PRODUCTS</div>
                </Link>
                <div className="w-[100%] rounded-[20px] bg-[#F1EFE8] flex justify-center py-[15px]">
                    <div className="w-[95%] flex gap-4 items-center">
                        <div className=" rounded-[35px]  w-[355px] aspect-square h-fit overflow-hidden">
                            <Image src={detailImage} alt="image" className="w-full h-full object-cover " />
                        </div>
                        <div className="">
                            <div>
                            <p>Item</p>
                            <p>Mens high neck black turtle polo shirt</p>
                            </div>
                            <div>
                            <p>Polo</p>
                            <p>₦30,000</p>
                            </div>
                            <div className="flex gap-4 items-center">
                                <div>
                                    <p>COLOR</p>
                                    <p></p>
                                </div>
                                <div>
                                    <p>SIZE</p>
                                    <p>Small</p>
                                </div>
                                <div>
                                    <p>QTY</p>
                                    <p>1PCS </p>
                                </div>
                            </div>
                            <div>
                            <p>Time of order</p>
                            <p>14 November 2024, 14:32:43</p>
                            </div>
                            <div>
                            <p>Buyer  address</p>
                            <p>ROYAL ILLA, IFITE, ANAMBRA. NIGERIA</p>
                            </div>
                        </div>
                        <div className="w-[306.37px] bg-white">
                            <div>
                                <p>Tracking Product</p>
                           </div>   
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </BaseLayout>
    )
}