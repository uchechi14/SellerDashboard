'use client'

import BaseLayout from "../BaseLayout";
import Header from "../components/dashboard/Header";
import { IoCartOutline } from "react-icons/io5";
import { PiFireSimple } from "react-icons/pi";
import { BsBoxSeam } from "react-icons/bs";
import { useState } from "react";
import Link from "next/link";



export default function Product () {

     const [toggle, setToggle] = useState('FirstOrder')
    
    //   const handleToggle = () =>{
    //     switch (toggle) {
    //         case 'FirstOrder':
    //           return <NewOrderTable />;
    //         case 'SecondOrder':
    //           return <PendingOrderTable />;
    //         case 'ThirdOrder':
    //           return <SentOutTable />;
    //         case 'ForthOrder':
    //           return <CompletedTable />;
    //           default:
    //         return <NewOrderTable />;
    //     }
    //   }
    
    return (
        <BaseLayout>
            <div>
                <Header title="Products" note="Keep tracks of all your uploaded products"/>


                <div className="mt-11">
                    <div className="flex justify-between items-center border-b-[1px] border-b-[#D9D9D9] pb-[20px] ">
                    <div className="flex items-center gap-[40px] ">
                           <p className={`text-[15px] font-medium flex items-center gap-2 border-b-[1px] cursor-pointer ${toggle === 'FirstOrder' ? 'text-[#0171E3]' : ''} }`} onClick={() => setToggle('FirstOrder')}> <IoCartOutline className="text-[17px]" />All products</p>
                           <p className={`text-[15px] font-medium flex items-center gap-2  cursor-pointer ${toggle === 'SecondOrder' ? 'text-[#0171E3]' : ''} }`} onClick={() => setToggle('SecondOrder')} > <PiFireSimple  className="text-[17px]" /> Posted products</p>
                           <p className={`text-[15px] font-medium flex items-center gap-2 cursor-pointer ${toggle === 'ThirdOrder' ? 'text-[#0171E3]' : ''} }`} onClick={() => setToggle('ThirdOrder')} > <BsBoxSeam className="text-[17px]" /> Archived products</p>
                    </div>
                    <div>
                        <Link href='product/uploadProduct'>
                        <button className="bg-[#000000] text-white text-[14px] rounded-full py-[7px] px-[7px]">Upload new products</button>
                        </Link>
                    </div>
                    </div>
            </div>
            </div>
        </BaseLayout>
    )
}