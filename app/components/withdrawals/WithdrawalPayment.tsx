'use client'
import { useState } from "react";
import { TbLetterX } from "react-icons/tb";
import WithdrawalSuccessful from "./WithdrawalSuccessful";
import { IoIosArrowBack } from "react-icons/io";




interface WithdrawalProps {
    handleSubmit: () => void;
    onBack?: () => void;  

}



const WithdrawalPayment: React.FC<WithdrawalProps> = ({handleSubmit, onBack}) => {

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
    console.log(currentStep)


    return(

        <>
           <div className={`w-[30rem] max-w-[90%] max-h-[90vh] rounded-[20px] px-[2rem] bg-white flex justify-center items-center  py-[1.5rem] flex-col   ${currentStep === 'details' ? 'flex' : 'hidden' }`} >
                    <div className='flex justify-between items-center w-full'>
                        <div className={`size-[36px] rounded-full border border-[#F1F1F1] cursor-pointer flex justify-center items-center`} onClick={handleBack}><IoIosArrowBack /></div>
                    <p className="text-[18px] font-bold text-center ">Cash Withdrawal</p>
                    <div className={`size-[36px] rounded-full border border-[#F1F1F1] cursor-pointer flex justify-center items-center`} onClick={handleSubmit}>
                    <TbLetterX />
                    </div>
                    </div>
                    <div className="mt-4 w-full">
                        <div className='w-full'>  
                            <input className="bg-[#F3F3F3] w-full py-[13px] text-[12px] text-black rounded-[15px] outline-none pl-[13px]" placeholder='Enter amount'/>
                        </div>
                       <div className='w-full flex justify-center mt-3 border border-[#F3F3F3] rounded-[15px] py-4'>
                        <div className='w-[90%]'>
                            <div className='flex justify-between'>
                                <p className='text-[12px] text-black opacity-[50%]'>Bank Name</p>
                                <p className='text-[12px]'>Access Bank</p>
                            </div>
                            <div className='flex justify-between mt-5'>
                                <p className='text-[12px] text-black opacity-[50%]'>Account number</p>
                                <p className='text-[12px]'>6356356379</p>
                            </div>
                        </div>
                       </div>
                       <button className='w-full bg-[#0171E3] rounded-full py-[10px] text-[15px] text-white mt-11 ' onClick={handleContinue}>Continue</button>
                    </div>
                </div>

            {currentStep === 'payment' && (
                <WithdrawalSuccessful 
                    onBack={() => setCurrentStep('details')} 
                    handleSubmit={handleSubmit} />
            )}
        </>
    )
}
export default WithdrawalPayment;