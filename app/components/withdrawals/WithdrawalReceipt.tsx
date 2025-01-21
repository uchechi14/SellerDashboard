'use client'
import { TbLetterX } from "react-icons/tb";
import { IoIosArrowBack } from "react-icons/io";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { RiDeleteBin5Fill } from "react-icons/ri";




interface WithdrawalProps {
    handleSubmit: () => void;
    onBack?: () => void;
}



const WithdrawalReceipt: React.FC<WithdrawalProps> = ({handleSubmit, onBack}) => {
    

     const [currentStep, setCurrentStep] = useState<'details' | 'payment'>('details')

     const handleContinue = () => {
        setCurrentStep('payment')
    }
    
    const handleBack = () => {
        if(currentStep === 'payment'){
            setCurrentStep('details')
        } else{
            onBack?.()
        }
    }



    return(

        <>
           <div className={`w-[35%] rounded-[20px] bg-white flex justify-center items-center h-[400px] ${currentStep === 'details' ? 'flex' : 'hidden' }`} >
                <div className="w-[90%]">
                    <div className='flex justify-between items-center'>
                        <div className={`size-[36px] rounded-full border border-[#F1F1F1] cursor-pointer flex justify-center items-center`} onClick={handleBack}><IoIosArrowBack /></div>
                    <p className="text-[18px] font-bold text-center ">Cash Withdrawal</p>
                    <div className={`size-[36px] rounded-full border border-[#F1F1F1] cursor-pointer flex justify-center items-center`} onClick={handleSubmit}>
                    <TbLetterX />
                    </div>
                    </div>
                    <div className="mt-3">
                        <div className='w-full flex justify-between'>  
                            <p className="text-[15px] ">Saved accounts</p>
                            <p className="text-[12px] text-[#0171E3] px-[10px] py-[8px] bg-[#F3F3F3] flex items-center gap-2 rounded-[20px]">Add new <FaPlus /></p>
                        </div>
                       <div className='w-full flex justify-center mt-3 border border-[#F3F3F3] rounded-[15px] py-4'>
                        <div className='w-[90%] flex justify-between items-center'>
                            <div>
                            <div className='flex  gap-4'>
                                <p className='text-[12px] text-black opacity-[50%]'>Bank Name:</p>
                                <p className='text-[12px]'>Access Bank</p>
                            </div>
                            <div className='flex gap-4 mt-3'>
                                <p className='text-[12px] text-black opacity-[50%]'>Account number</p>
                                <p className='text-[12px]'>6356356379</p>
                            </div>
                            </div>
                            <div className="cursor-pointer"><RiDeleteBin5Fill /></div>
                        </div>
                       </div>
                       <div className='w-full flex justify-center mt-3 border border-[#F3F3F3] rounded-[15px] py-4'>
                        <div className='w-[90%] flex justify-between items-center'>
                            <div>
                            <div className='flex  gap-4'>
                                <p className='text-[12px] text-black opacity-[50%]'>Bank Name:</p>
                                <p className='text-[12px]'>Access Bank</p>
                            </div>
                            <div className='flex gap-4 mt-3'>
                                <p className='text-[12px] text-black opacity-[50%]'>Account number</p>
                                <p className='text-[12px]'>6356356379</p>
                            </div>
                            </div>
                            <div className="cursor-pointer"><RiDeleteBin5Fill /></div>
                        </div>
                       </div>
                       <button className='w-full bg-[#0171E3] rounded-full py-[10px] text-[15px] text-white mt-8 ' onClick={handleContinue}>Continue</button>
                    </div>
                    </div>
                </div>
              
               </>
    )
}
export default WithdrawalReceipt;