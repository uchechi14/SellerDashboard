'use client'
import { BiSolidLeftArrow } from "react-icons/bi";
import detailImage from "../../../public/detailImage.png"
import Image from "next/image"
// import BaseLayout from "@/app/BaseLayout";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";
import { useParams } from 'next/navigation';
import BaseLayout from "@/app/BaseLayout";







export default function OrderDetails() {

    const params = useParams();
   const id = params?.Id;

   const OrderDetail =  [
    {
        name: 'Mens high neck black turtle polo shirt',
        price: 'N 23,000',
        trackingId: '#425t70',
        Id:1,

    },
    {
        name: 'Mens high neck black turtle polo shirt',
        price: 'N 23,000',
        trackingId: '#425t74',

    },
    {
        name: 'Mens high neck black turtle polo shirt',
        price: 'N 23,000',
        trackingId: '#425t72',

    },
    {
        name: 'Mens high neck black turtle polo shirt',
        price: 'N 23,000',
        trackingId: '#425t74',

    },

]

const order = OrderDetail.find(item => item.Id === id);


    // const order = await OrderDetails(params.trackingId);

    // const [activeTick, setActiveTick] = useState<'all' | 'first' | 'second'>('all');

    // const handleTickUpdate = (tick: 'all' | 'first' | 'second') => {
    //     setActiveTick(tick)
    // }

    if (!order) {
        return <div>Order not found</div>;
      }

      const orderTrackingSteps = [
        {
            status: "ORDER RECEIVED",
            date: "14 November 2024, 14:32:43",
            trackingId: "#54DED77F"
        },
        {
            status: "PRODUCT SENT OUT",
            date: "14 November 2024, 14:32:43",
        },
        {
            status: "ORDER DELIVERED",
            date: "14 November 2024, 14:32:43",
        }
    ];
    

    return(
       <BaseLayout>
        <div className="w-full bg-white md:w-[80rem] mt-[2rem] max-w-full mx-auto rounder-[20px] flex justify-center p-5 rounded-[20px]">
            <div className=" w-full ">
                <Link href="/order">
                <div className="flex items-center text-[13px] gap-2"><BiSolidLeftArrow /> BACK TO PRODUCTS</div>
                </Link>
                <div className="w-[100%]  rounded-[20px] md:bg-[#F1EFE8] flex justify-center md:p-[15px] mt-5">
                    {/* {OrderDetail.map ((items, index) => ( */}
                        <div className=" w-full flex gap-4 md:items-center justify-between  flex-col md:flex-row" >
                        <div className=" md:rounded-[25px] rounded-[15px] relative md:w-full  w-1/2 aspect-square  h-fit overflow-hidden flex flex-col md:items-center">
                            <Image src={detailImage} alt="image" className="w-full h-full object-cover " />
                            <div className=" hidden  bottom-[1rem] absolute md:py-[0.6rem] md:flex items-center gap-1 rounded-[20px] bg-[#FFFFFF] backdrop-blur-md bg-opacity-20 px-[1rem] ">
                                <p className="text-sm font-medium relative">BUYER ID:</p>
                                <p className="px-[0.8rem] py-[0.2rem] bg-[#E1E3FF] text-xs rounded-[15px] text-[#0171E3]">{order?.trackingId}</p>
                            </div>
                        </div>
                        <div className="md:hidden">BUYER ID: {order?.trackingId} </div>
                        <div className=" flex flex-col gap-[0.75rem] w-full">
                            <div>
                            <p className="">Item</p>
                            <p className="text-sm">{order?.name}</p>
                            </div>
                            <div className="">
                            <p className="  opacity-50">POLO</p>
                            <p className="text-lg font-semibold">₦30,000</p>
                            </div>
                            <div className="flex gap-4  ">
                                <div>
                                    <p className="text-sm  font-normal">COLOR</p>
                                    <p className="size-[29px] rounded-full bg-[#D9D9D9]"></p>
                                </div>
                                <div>
                                    <p className="text-sm font-normal">SIZE</p>
                                    <p className="uppercase px-[1.2rem] text-sm py-[0.3rem] rounded-[20px] border border-black">Small </p>
                                </div>
                                <div>
                                    <p className="text-sm font-normal">QTY</p>
                                    <p className="uppercase px-[1.2rem] text-sm py-[0.3rem] rounded-[20px] border border-black">1PCS </p>
                                </div>
                            </div>
                            <div className="">
                            <p className=" ">Time of order</p>
                            <p className="text-sm ">14 November 2024, 14:32:43</p>
                            </div>
                            <div className="">
                            <p className=" ">Buyer  address</p>
                            <p className="text-sm ">ROYAL ILLA, IFITE, ANAMBRA. NIGERIA</p>
                            </div>
                        </div>
                        <div className=" w-full  bg-white flex-col flex md:items-center justify-center  rounded-[35px] p-4">
                            <div className="  flex flex-col gap-[1rem]">
                                <p className="text-[17px] font-semibold">TRACK PRODUCT</p>
                                <div className=" flex  flex-col">
    {orderTrackingSteps.map((step, index) => (
        <div key={index} className="flex gap-3">
            <div className="flex flex-col  items-center">
                <div className="text-[12px] text-[#14B8A6]"><FaCheckCircle /></div>
                {index !== orderTrackingSteps.length - 1 && <div className="border border-[#14B8A6] h-full"></div>}
            </div>
            <div className={` ${index == orderTrackingSteps.length -1 ?  'mb-0': ' mb-[15px]'}`}>
                <p className="text-sm font-semibold ">{step.status}</p>
                <p className="text-xs text-black opacity-[30%] ">{step.date}</p>
                {step.trackingId && <p className="text-[13px] text-black opacity-[30%]">{step.trackingId}</p>}
            </div>
        </div>
    ))}
</div>

                              <div className="flex w-full gap-[5%] ">
                              <div className="  p-2 flex items-center gap-1  justify-center rounded-[20px] bg-[#0171E308]">
                                <p className=" text-xs font-medium">Product ID:</p>
                                <p className="px-[7px] py-[2px] bg-[#E1E3FF] text-[11px] rounded-[20px] text-[#0171E3]">#425t72</p>
                            </div>
                            <div className=" px-[1rem] whitespace-nowrap bg-[#EDF6FF] text-[11px] rounded-full flex justify-center items-center">Awaiting completion</div>
                              </div>
                           </div>   
                        </div></div>
                        
                    {/* ))} */}
                </div>
            </div>
        </div>
       </BaseLayout>
    )
}