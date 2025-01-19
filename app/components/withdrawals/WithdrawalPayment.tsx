'use client'
import { useState } from "react";
import { TbLetterX } from "react-icons/tb";
import WithdrawalSuccessful from "./WithdrawalSuccessful";




interface WithdrawalProps {
    handleSubmit: () => void;
}



const WithdrawalPayment: React.FC<WithdrawalProps> = ({handleSubmit}) => {

    const [currentStep, setCurrentStep] = useState<'details' | 'payment'>('details')

    const handleContinue = () => {
        setCurrentStep('payment')
    }
    const handleBack = () => {
        setCurrentStep('details')
    }


    return(

        <>
           <div className={`w-[35%] rounded-[20px] bg-white flex justify-center items-center h-[350px] ${currentStep === 'details' ? 'flex' : 'hidden' }`} >
                <div className="w-[90%]">
                    <div className='flex justify-between items-center'>
                        <div></div>
                    <p className="text-[18px] font-bold text-center ">Cash Withdrawal</p>
                    <div className={`size-[36px] rounded-full border border-[#F1F1F1] cursor-pointer flex justify-center items-center`} onClick={handleSubmit}>
                    <TbLetterX />
                    </div>
                    </div>
                    <div className="mt-4">
                        <div className='w-full'>  
                            <input className="bg-[#F3F3F3] w-full py-[10px] rounded-[15px] outline-none pl-[10px]" placeholder='Enter amount'/>
                        </div>
                       <div className='w-full flex justify-center mt-3 border border-[#F3F3F3] rounded-[15px]'>
                        <div className='w-[90%]'>
                            <div className='flex justify-between'>
                                <p className='text-[12px] text-black opacity-[50%]'>Bank Name</p>
                                <p className='text-[12px]'>Access Bank</p>
                            </div>
                            <div className='flex justify-between'>
                                <p className='text-[12px] text-black opacity-[50%]'>Account number</p>
                                <p className='text-[12px]'>6356356379</p>
                            </div>
                        </div>
                       </div>
                       <button className='w-full bg-[#0171E3] rounded-full py-[10px] text-[15px] text-white mt-11 ' onClick={handleContinue}>Continue</button>
                    </div>
                    </div>
                </div>

            {currentStep === 'payment' && (
                <WithdrawalSuccessful 
                    handleBack={handleBack}
                    handleSubmit={handleSubmit} />
            )}
        </>
    )
}
export default WithdrawalPayment;