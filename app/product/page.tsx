'use client'
import BaseLayout from "../BaseLayout";
import Header from "../components/dashboard/Header";
import { IoCartOutline } from "react-icons/io5";
import { PiFireSimple } from "react-icons/pi";
import { BsBoxSeam } from "react-icons/bs";
import { useState } from "react";
import Link from "next/link";
import Products from "../components/products/Products";

export default function Product() {

    const [activeTab, setActiveTab] = useState<'all' | 'posted' | 'archived'>('all');

    const handleTabChange = (tab: 'all' | 'posted' | 'archived') => {
        setActiveTab(tab);
    };

    const getShowArchived = () => {
        switch (activeTab) {
            case 'archived':
                return true;
            case 'posted':
                return false;
            case 'all':
                return undefined; 
            default:
                return false;
        }
    };

    return (
        <BaseLayout>
            <div>
                <Header title="Products" note="Keep tracks of all your uploaded products"/>
                <div className="mt-11">
                    <div className="flex justify-between items-center border-b-[1px] border-b-[#D9D9D9] pb-[20px] ">
                        <div className="flex items-center gap-[40px] ">
                            <p 
                                className={`text-[15px] font-medium flex items-center gap-2 cursor-pointer ${
                                    activeTab === 'all' ? 'text-[#0171E3] border-b-[1px]' : ''
                                }`}
                                onClick={() => handleTabChange('all')}
                            >
                                <IoCartOutline className="text-[17px]" />
                                All products
                            </p>
                            <p 
                                className={`text-[15px] font-medium flex items-center gap-2 cursor-pointer ${
                                    activeTab === 'posted' ? 'text-[#0171E3] border-b-[1px]' : ''
                                }`}
                                onClick={() => handleTabChange('posted')}
                            >
                                <PiFireSimple className="text-[17px]" />
                                Posted products
                            </p>
                            <p 
                                className={`text-[15px] font-medium flex items-center gap-2 cursor-pointer ${
                                    activeTab === 'archived' ? 'text-[#0171E3] border-b-[1px]' : ''
                                }`}
                                onClick={() => handleTabChange('archived')}
                            >
                                <BsBoxSeam className="text-[17px]" />
                                Archived products
                            </p>
                        </div>
                        <div>
                            <Link href='product/uploadProduct'>
                                <button className="bg-[#000000] text-white text-[14px] rounded-full py-[7px] px-[7px]">
                                    Upload new products
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="w-full rounded-[20px] bg-white py-4 flex justify-center mt-6">
                        <div className="w-[97%] mt-3 ">
                            <Products showArchived={getShowArchived()} activeTab={activeTab} />
                        </div>
                    </div>
                </div>
            </div>
        </BaseLayout>
    )
}