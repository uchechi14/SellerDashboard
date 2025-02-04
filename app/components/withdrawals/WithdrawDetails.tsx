'use client'

import React, { useState, useMemo } from 'react'
import Select from 'react-select'
import countryList from 'react-select-country-list'
import { TbLetterX } from "react-icons/tb";
import WithdrawalPayment from './WithdrawalPayment';




interface WithdrawalProps {
    handleSubmit: () => void;
}

interface Option {
    label: string;
    value: string | number;
  }



const WithdrawDetails: React.FC<WithdrawalProps> = ({handleSubmit}) => {

    const [currentStep, setCurrentStep] = useState<'details' | 'payment'>('details')

       const [value, setValue] = useState<Option | null>(null)
        const options = useMemo(() => countryList().getData(), [])

        const changeHandler = (value: Option) => {
            setValue(value)
          }
         

        const handleContinue = () => {
            setCurrentStep('payment')
        }


     

    return(
        <>
           <div className={`w-[30rem] max-w-[90%] max-h-[90vh] rounded-[20px] px-[2rem] bg-white flex justify-center items-center  py-[1.5rem] flex-col  ${currentStep === 'details' ? 'flex' : 'hidden'
                    }`}>
                    <div className='flex justify-between w-full items-center'>   
                        <div></div>
                    <p className="text-[18px] font-bold text-center ">Cash Withdrawal</p>
                    <div className={`size-[36px] rounded-full border border-[#F1F1F1] cursor-pointer flex justify-center items-center`} onClick={handleSubmit}>
                    <TbLetterX />
                    </div>
                    </div>
                    <div className="mt-4">
                        <div className='flex gap-3'>  
                            <div className=" w-full ">
                            <Select options={options} value={value} onChange={ () => changeHandler} />
                            </div>
                            <input className="bg-[#F3F3F3] w-full py-[10px] rounded-[15px] outline-none pl-[10px]" placeholder='Select bank'/>
                        </div>
                       <div className='w-full mt-3'>
                        <input placeholder="Enter account number" className="bg-[#F3F3F3] pl-[12px] w-full py-[12px] rounded-[15px] outline-none "/>
                       </div>
                       <button className='w-full bg-[#0171E3] rounded-full py-[10px] text-[15px] text-white mt-11 '   onClick={handleContinue}>Continue</button>
                    </div>
                    </div>

                    
                {currentStep === 'payment' && (
                <WithdrawalPayment 
                    handleSubmit={handleSubmit} 
                    onBack={() => setCurrentStep('details')} 
                    />
            )}
                </>
    )
}




export default WithdrawDetails;