'use client'

import BaseLayout from "../BaseLayout";
import Header from "../components/dashboard/Header";
import { BsHandbag } from "react-icons/bs";
import { IoSunnyOutline } from "react-icons/io5";
import { IoRocketOutline } from "react-icons/io5";
import { FaRegSquareCheck } from "react-icons/fa6";
import { useState } from "react";
import OrderTable from "../components/orders/OrderTable";

export default function OrderPage() {
  const [activeTab, setActiveTab] = useState('NewOrders');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const getOrderStatus = (tab: string | undefined): string => {
    switch (tab) {
      case 'NewOrders':
        return 'new';
      case 'PendingOrders':
        return 'pending';
      case 'SentOut':
        return 'sent';
      case 'Completed':
        return 'completed';
      default:
        return 'new';
    }
  };
  const orderTabs = [
    { id: 'NewOrders', label: 'New Orders', icon: <BsHandbag className="text-[17px]" /> },
    { id: 'PendingOrders', label: 'Pending Orders', icon: <IoSunnyOutline className="text-[17px]" /> },
    { id: 'SentOut', label: 'Sent Out', icon: <IoRocketOutline className="text-[17px]" /> },
    { id: 'Completed', label: 'Completed', icon: <FaRegSquareCheck className="text-[17px]" /> },
];

  return (
    <BaseLayout>
      <div>
        <Header title="Orders" note="Keep tracks of all your orders past and present"/>
         
        <div className="mt-6">
        <div className="flex items-center gap-[40px] border-b-[1px] border-b-[#D9D9D9] pb-[15px] whitespace-nowrap overflow-x-auto">
    {orderTabs.map((tab) => (
        <p 
            key={tab.id}
            className={`text-reponsiveText font-medium flex items-center gap-2 cursor-pointer border-b-[1px] ${activeTab === tab.id ? 'text-[#0171E3]' : ''}`}
            onClick={() => handleTabChange(tab.id)}
        >
            {tab.icon} {tab.label}
        </p>
    ))}
</div>


            <div className="mt-9 w-full">
            <OrderTable 
              activeTab={activeTab as 'NewOrders' | 'PendingOrders' | 'SentOut' | 'Completed'} 
              orderStatus={getOrderStatus(activeTab)}
              handleTabChange={handleTabChange}
            />
            </div>
          
         </div>
      </div>
    </BaseLayout>
  );
}           
