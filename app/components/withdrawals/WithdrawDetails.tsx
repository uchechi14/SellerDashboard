'use client'

import React, { useState, useMemo } from 'react'
import Select from 'react-select'
import countryList from 'react-select-country-list'
import { TbLetterX } from "react-icons/tb";
import WithdrawalPayment from './WithdrawalPayment';




interface WithdrawalProps {
    handleSubmit: () => void;
}



const WithdrawDetails: React.FC<WithdrawalProps> = ({handleSubmit}) => {

    const [currentStep, setCurrentStep] = useState<'details' | 'payment'>('details')

    const [value, setValue] = useState<string>('')
        const options = useMemo(() => countryList().getData(), [])

        const changeHandler = value => {
        setValue(value)
        }

        const handleContinue = () => {
            setCurrentStep('payment')
        }
        const handleBack = () => {
            setCurrentStep('details')
        }

     

    return(
        <>
           <div className={`w-[35%] rounded-[20px] bg-white flex justify-center items-center h-[350px]  ${currentStep === 'details' ? 'flex' : 'hidden'
                                }`}>
                <div className="w-[90%]">
                    <div className='flex justify-between items-center'>
                        <div></div>
                    <p className="text-[18px] font-bold text-center ">Cash Withdrawal</p>
                    <div className={`size-[36px] rounded-full border border-[#F1F1F1] cursor-pointer flex justify-center items-center`} onClick={handleSubmit}>
                    <TbLetterX />
                    </div>
                    </div>
                    <div className="mt-4">
                        <div className='flex gap-3'>  
                            <div className=" w-full ">
                            <Select options={options} value={value} onChange={changeHandler} />
                            </div>
                            <input className="bg-[#F3F3F3] w-full py-[10px] rounded-[15px] outline-none pl-[10px]" placeholder='Select bank'/>
                        </div>
                       <div className='w-full mt-3'>
                        <input placeholder="Enter account number" className="bg-[#F3F3F3] pl-[12px] w-full py-[12px] rounded-[15px] outline-none "/>
                       </div>
                       <button className='w-full bg-[#0171E3] rounded-full py-[10px] text-[15px] text-white mt-11 '   onClick={handleContinue}>Continue</button>
                    </div>
                    </div>

                    
                </div>
                {currentStep === 'payment' && (
                <WithdrawalPayment 
                    handleBack={handleBack}
                    handleSubmit={handleSubmit} />
            )}
                </>
    )
}




export default WithdrawDetails;