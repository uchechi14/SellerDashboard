"use client";

import Link from "next/link";

const CreatedAccount = () => {
  return (
    <div
      // onClick={() => setStep(1)}
      className="bg-bgTrans  justify-center flex items-center flex-col w-full fixed  z-[100] top-0 left-0 h-screen"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className=" border2 flex bg-white py-[1.3rem] w-[30rem] max-w-[90%] max-h-[90vh] rounded-[20px] px-[2rem]  gap-[2rem] flex-col items-center relative"
      >
        {/* <button className='absolute top-[1.2rem] left-[1.2rem]' onClick={()=>handleSubmit()}>                <Image src={closeImage} className='w-[2.5rem] h-fit' alt='close'/>             
               </button> */}

        <p className="md:text-2xl mt-[2rem] text-lg w-[70%] md:w-full font-bold text-center ">
          Account created <br className="hidden md:block" /> successfully
        </p>
        {/* <div className="flex items-center px-[5px] gap-1 py-[7px]  justify-center rounded-[20px] bg-[#0171E308]">
          <p className="text-[12px] font-medium">Seller ID:</p>
          <p className="px-[7px] py-[2px] bg-[#E1E3FF] text-[11px] rounded-[20px] text-[#0171E3]">
            #425t72
          </p>
        </div> */}
        <p className="text-[15px] text-black text-opacity-[50%] text-center tablet:w-full">
          Your verification is in process and would be communicated when review
          is done
        </p>
        <Link href="/dashboard">
          <button className=" px-[3rem] max-w-full bg-[#050505] rounded-full py-[1.3rem] w-fit text-white  ">
            Go to dashboard
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CreatedAccount;
