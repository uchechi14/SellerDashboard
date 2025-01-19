'use client'


import { useState } from "react";
import BaseLayout from "../BaseLayout";
import Header from "../components/dashboard/Header";
// import Chart from "../components/ui/card";
import WithdrawalCard from "../components/ui/WithdrawalCard";
import { RiMenuFoldLine } from "react-icons/ri";
import WithdrawDetails from "../components/withdrawals/WithdrawDetails";
import WithdrawalPayment from "../components/withdrawals/WithdrawalPayment";




const tableItems = [
    {
        invoice: 'Invoice #009876',
        amount: '₦ 234,765',
        date: 'June12,2024',
        status: 'Success',
        bank: 'Opay Digital',
    },
    {
        invoice: 'Invoice #009876',
        amount: '₦ 234,765',
        date: 'June12,2024',
        status: 'Success',
        bank: 'Opay Digital',
    },
    {
        invoice: 'Invoice #009876',
        amount: '₦ 234,765',
        date: 'June12,2024',
        status: 'Success',
        bank: 'Opay Digital',
    },
    {
        invoice: 'Invoice #009876',
        amount: '₦ 234,765',
        date: 'June12,2024',
        status: 'Success',
        bank: 'Opay Digital',
    },
    


]


export default function WithdrawalPage() {

     const [isOpen, setIsOpen] = useState<boolean>(false)
    
       const handleSubmit = (): void =>{
        setIsOpen(!isOpen)
       }

    return(
        <BaseLayout>
        <div>
            <Header title="Withdrawal" note="Withdraw straight to your bank account"/>

            <div className="w-full rounded-[20px] bg-white py-4 flex justify-center mt-6">
                <div className="w-[95%] mt-3 ">
                    <p className="text-[20px]">Withdrawal statistics</p>
                    <div className=" gap-5 mt-[20px] grid grid-cols-mediaGrid xl:flex xl:w-full">
                                <WithdrawalCard
                                title="Current available balance"
                                handleClick={handleSubmit}
                                amount="₦430,876"
                                text="Withdraw"
                                style={{
                                  padding: "5px 10px 5px 10px",
                                  fontSize: "13px",
                                  borderRadius: "50px",
                                  backgroundColor: "#0171E3",
                                  color: "white",
                                  cursor: "pointer"
                                }}
                                style2={{
                                  color: "",
                                  display: "",
                                  alignItems: "",
                                  fontSize: "",
                                }}
                                style3={{
                                  backgroundColor: "black"
                                }}
                                style4={{
                                  color: "white"
                                }}
                                style5={{
                                  color: "white"
                                }}
                                rate=""
                              />
                              <WithdrawalCard
                                title="Amount sold"
                                amount="₦430,876"
                                chart="chart"
                                text="All time"
                                style={{ fontSize: "13px" }}
                                rate="23.65%"
                                style2={{
                                  color: "#0071E3",
                                  display: "flex",
                                  alignItems: "center",
                                  fontSize: "13px",
                                  
                                }}
                                style3={{
                                    backgroundColor: "#F1EFE8"
                                  }}
                                  style4={{
                                    color: "black"
                                  }}
                                  style5={{
                                    color: "black"
                                  }}
                              />
                              <WithdrawalCard
                                title="Products sold"
                                amount="4343 Sold"
                                chart="chart"
                                text="Since this month"
                                style={{ fontSize: "13px" }}
                                rate="23.65%"
                                style2={{
                                  color: "",
                                  display: "",
                                  alignItems: "",
                                  fontSize: "",
                                }}
                                style3={{
                                    backgroundColor: "#F1EFE8"
                                  }}
                                  style4={{
                                    color: "black"
                                  }}
                                  style5={{
                                    color: "black"
                                  }}
                              /> 
                            </div>
                 <div className="mt-6">
                    <div className="flex justify-between">
                    <p className="text-[20px]">Transaction History</p>
                    <div className="text-[20px] text-[#2B3F6C]"><RiMenuFoldLine /></div>
                    </div>

                    <div className="overflow-x-auto mt-2 bg-white rounded-[15px]">
            <table className="w-full min-w-[55rem] bg-white rounded-[15px]">
                <thead className="text-left rounded-sm border-b-[1px] border-b-[#D9D9D9]">
                    <tr className="">
                        <td className="text-[15px] text-black opacity-[50%] px-3 py-5">Payment invoice</td>
                        <td className="text-[15px] text-black opacity-[50%] px-3 py-5">Amount</td>
                        <td className="text-[15px] text-black opacity-[50%] px-3 py-5">Date</td>
                        <td className="text-[15px] text-black opacity-[50%] px-3 py-5">Status</td>
                        <td className="text-[15px] text-black opacity-[50%] px-3 py-5">Bank sent to</td>
                    </tr>
                </thead>
                <tbody>
                    {tableItems.map((items, index) => (
                         <tr key={index}>
                         <td className="p-3 text-[16px]">{items.invoice}</td>
                         <td className="p-3 text-[16px]">{items.amount}</td>
                         <td className="p-3">{items.date}</td>
                         <td className="p-3">{items.status}</td>
                         <td className="p-3"> {items.bank} </td>
                     </tr>

                    ))}
                   
                </tbody>
            </table>
        </div>
                </div>
                </div>
            </div>   

            <div className={`bg-bgTrans justify-center flex items-center w-full fixed  top-0 left-0 h-screen ${isOpen ? 'block' : 'hidden'}`}>
                    <WithdrawDetails handleSubmit={handleSubmit}/>
                    {/* <WithdrawalPayment handleSubmit={handleSubmit}/> */}
           </div>        
        </div>
        </BaseLayout>
    )
}