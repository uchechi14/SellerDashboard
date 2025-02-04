'use client'
import React, {  } from 'react'
import { MdErrorOutline } from 'react-icons/md';
import { TbFileDownload } from 'react-icons/tb';

type props = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

const Upload = ({ setStep }: props) => {



  return (
    <>
    <form className='w-full' onSubmit={(e) => {e.preventDefault(); setStep((prev) => prev + 1);}}>
       <div className="w-full bg-white rounded-[12px] flex gap-3 px-3 py-3">
        <MdErrorOutline className="text-[25px]" />
        <p className="text-[13px]">
          Step 3 and 4 is optional and can be skipped, upon filling this and
          submitting you are eligible to be verified as a seller and improve
          your chance of sales
        </p>
      </div>
      <div className='mt-[15px]'>
        <p className='text-[15px]'>ID UPLOAD</p>
        <select className='w-full bg-[white] border outline-none border-black px-[10px] rounded-[15px] h-[4rem] focus:border-opacity-70 border-opacity-30 transition duration-300 text-black text-opacity-[50%]'>
            <option>Select document type</option>
        </select>
        <label
                    className=" h-[100px] mt-[15px] bg-white flex justify-between items-center mobile:w-full w-full border outline-none border-black px-[10px] rounded-[15px]  focus:border-opacity-70 border-opacity-30 transition duration-300 "
                    htmlFor="upload-button"
                  >
                    <p className=' text-black text-opacity-[50%]'>Upload document picture</p>
                    <input type="file" id="upload-button" className="hidden"  />
                    <TbFileDownload className=' text-[25px]' />
                  </label>
      </div>
      <div className='mt-[10px]'> 
        <p className='text-[15px]'>UPLOAD ANY OTHER RELEVANT DOCUMENT</p>
           <label
                    className=" h-[100px] mt-[15px] bg-white flex items-center justify-between mobile:w-full w-full border outline-none border-black px-[10px] rounded-[15px]  focus:border-opacity-70 border-opacity-30 transition duration-300 "
                    htmlFor="upload-button"
                  >
                    <p className=' text-black text-opacity-[50%]'>Upload document picture</p>
                    <input type="file" id="upload-button" className="hidden"  />
                    <TbFileDownload className='text-[25px]' />
                  </label>
      </div>

      <div className="flex justify-between mt-20 text-sm">
        <button
          className="px-[25px] py-[10px] rounded-[35px] uppercase border border-black hover:opacity-[80%] transition-all ease-in-out duration-300"
          onClick={() => {
            setStep((prev) => prev - 1);
          }}
        >
          Back
        </button>
        <button type='submit'
          className="px-[25px] py-[10px] hover:opacity-[80%] transition-all ease-in-out duration-300 rounded-[35px] uppercase  text-white bg-black"
          
        >
          Next
        </button>
      </div>
    </form>


   </>
  )
}

export default Upload