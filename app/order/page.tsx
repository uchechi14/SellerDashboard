'use client'

import BaseLayout from "../BaseLayout";
import Header from "../components/dashboard/Header";
import { BsHandbag } from "react-icons/bs";
import { IoSunnyOutline } from "react-icons/io5";
import { IoRocketOutline } from "react-icons/io5";
import { FaRegSquareCheck } from "react-icons/fa6";
import NewOrderTable from "../components/orders/NewOrderTable";
import { useState } from "react";
import PendingOrderTable from "../components/orders/PendingOrderTable";
import SentOutTable from "../components/orders/SentOutTable";
import CompletedTable from "../components/orders/CompletedTable";

export default function OrderPage() {


  const [toggle, setToggle] = useState('FirstOrder')

  const handleToggle = () =>{
    switch (toggle) {
        case 'FirstOrder':
          return <NewOrderTable />;
        case 'SecondOrder':
          return <PendingOrderTable />;
        case 'ThirdOrder':
          return <SentOutTable />;
        case 'ForthOrder':
          return <CompletedTable />;
          default:
        return <NewOrderTable />;
    }
  }


  return (
    <BaseLayout>
      <div>
        <Header title="Orders" note="Keep tracks of all your orders past and present"/>
         
         <div className="mt-11">
          <div className="flex items-center gap-[40px] border-b-[1px] border-b-[#D9D9D9] pb-[25px] ">
            <p className={`text-[15px] font-medium flex items-center gap-2 border-b-[1px] cursor-pointer ${toggle === 'FirstOrder' ? 'text-[#0171E3]' : ''} }`} onClick={() => setToggle('FirstOrder')}> <BsHandbag className="text-[17px]" /> New Orders</p>
            <p className={`text-[15px] font-medium flex items-center gap-2  cursor-pointer ${toggle === 'SecondOrder' ? 'text-[#0171E3]' : ''} }`} onClick={() => setToggle('SecondOrder')} > <IoSunnyOutline className="text-[17px]" /> Pending Orders</p>
            <p className={`text-[15px] font-medium flex items-center gap-2 cursor-pointer ${toggle === 'ThirdOrder' ? 'text-[#0171E3]' : ''} }`} onClick={() => setToggle('ThirdOrder')} > <IoRocketOutline className="text-[17px]" /> Sent Out</p>
            <p className={`text-[15px] font-medium flex items-center gap-2 cursor-pointer ${toggle === 'ForthOrder' ? 'text-[#0171E3]' : ''} }`} onClick={() => setToggle('ForthOrder')} > <FaRegSquareCheck className="text-[17px]" /> Completed</p>
          </div>

          <div className="mt-9 w-full">
            {handleToggle()}
          </div>
         </div>
      </div>
    </BaseLayout>
  );
}
