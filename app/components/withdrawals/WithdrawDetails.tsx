'use client'

import React, { useState, useMemo } from 'react'
import Select from 'react-select'
import countryList from 'react-select-country-list'
import { TbLetterX } from "react-icons/tb";




interface WithdrawalProps {
    handleSubmit: () => void;
}



const WithdrawDetails: React.FC<WithdrawalProps> = ({handleSubmit}) => {

    const [value, setValue] = useState<string>('')
        const options = useMemo(() => countryList().getData(), [])

        const changeHandler = value => {
        setValue(value)
        }

    return(
           <div className="w-[35%] rounded-[20px] bg-white flex justify-center items-center h-[300px]">
                <div className="w-[90%]">
                    <div className='flex justify-center items-center'>
                    <p className="text-[18px] font-bold text-center ">Cash Withdrawal</p>
                    <div className={`size-[36px] rounded-full border border-[#F1F1F1] cursor-pointer flex justify-center items-center`} onClick={handleSubmit}>
                    <TbLetterX />
                    </div>
                    </div>
                    <div className="">
                        <div className='flex gap-2'>
                            
                            <div className="bg-[#F3F3F3]">
                            <Select options={options} value={value} onChange={changeHandler} /></div>
                            <div className="bg-[#F3F3F3]">Select bank</div>
                        </div>
                       <div>
                        <input placeholder="Enter account number" className="bg-[#F3F3F3] pl-[10px] w-full"/>
                       </div>
                    </div>
                    </div>
                </div>
    )
}
export default WithdrawDetails;