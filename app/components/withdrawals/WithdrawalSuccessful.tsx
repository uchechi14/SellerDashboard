'use client'
import { TbLetterX } from "react-icons/tb";




interface WithdrawalProps {
    handleSubmit: () => void;
}



const WithdrawalSuccessful: React.FC<WithdrawalProps> = ({handleSubmit}) => {



    return(

        <>
           <div className="w-[35%] rounded-[20px] bg-white flex justify-center items-center h-[350px]">
                <div className="w-[90%]">
                    <div className='flex justify-between items-center'>
                        <div></div>
                    <p className="text-[18px] font-bold text-center ">Cash Withdrawal</p>
                    <div className={`size-[36px] rounded-full border border-[#F1F1F1] cursor-pointer flex justify-center items-center`} onClick={handleSubmit}>
                    <TbLetterX />
                    </div>
                    </div>
                    <div className="mt-4">
                        <div className='text-[24px]'> Withdrawal successful</div>
                        <div className='text-[15px] w-[70%]'> Your withdrawal of $5800 has been processed, successful and its on its way</div>
                       <button className='w-full bg-[#0171E3] rounded-full py-[10px] text-[15px] text-white mt-11 '>Done</button>
                    </div>
                    </div>
                </div>

              
               </>
    )
}
export default WithdrawalSuccessful;