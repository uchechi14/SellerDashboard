'use client'
import { TbLetterX } from "react-icons/tb";
import { IoIosArrowBack } from "react-icons/io";
import { useState } from "react";
import WithdrawalReceipt from "./WithdrawalReceipt";




interface WithdrawalProps {
    handleSubmit: () => void;
    onBack?: () => void;
}



const WithdrawalSuccessful: React.FC<WithdrawalProps> = ({handleSubmit, onBack}) => {
    

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
           <div className={`w-[40%] tablet:w-[75%] rounded-[20px] bg-white flex justify-center items-center h-[400px] ${currentStep === 'details' ? 'flex' : 'hidden' }`}>
                <div className="w-[90%]">
                    <div className='flex justify-between items-center'>
                        <div className={`size-[36px] rounded-full border border-[#F1F1F1] cursor-pointer flex justify-center items-center`} onClick={handleBack}><IoIosArrowBack /></div>
                    <div className={`size-[36px] rounded-full border border-[#F1F1F1] cursor-pointer flex justify-center items-center`} onClick={handleSubmit}>
                    <TbLetterX />
                    </div>
                    </div>
                    <div className="mt-4 flex flex-col items-center">
                        <div className='text-[24px]'> Withdrawal successful</div>
                        <div className='text-[15px] w-[70%] text-black opacity-[50%] text-center'> Your withdrawal of $5800 has been processed, successful and its on its way</div>
                       <button className='w-full bg-[#0171E3] rounded-full py-[10px] text-[15px] text-white mt-11 ' onClick={handleContinue}>Done</button>
                    </div>
                    </div>
                </div>

                {currentStep === 'payment' &&
                <WithdrawalReceipt
                 handleSubmit={handleSubmit}
                 onBack={ () => setCurrentStep('details')}
                />
                }

              
               </>
    )
}
export default WithdrawalSuccessful;