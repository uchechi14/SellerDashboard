import React from "react";
import { LuPlus } from "react-icons/lu";

type props = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

const BrandDetails = ({ setStep }: props) => {
  return (
    
      <form className="">
        <div className='md:mt-10  flex flex-col md:justify-between'>    
        <p className="text-[15px] mt-3">BRAND DETAILS</p>
        <div className="flex md:items-center gap-3 flex-col md:flex-row items-start ">
          <label
            className="size-[80px] bg-[#F3F3F3] rounded-[20px] md:rounded-[100%] block mobile:w-[70%] mt-[10px]"
            htmlFor="upload-button"
          >
            <input type="file" id="upload-button" className="hidden" />
            <div className="flex justify-center items-center relative top-[35%] text-[25px] ">
              <LuPlus />
            </div>
          </label>
          <p className="text-[14px]">Add brand logo</p>
        </div>
        <div className="grid md:grid-cols-2 gap-4 mt-[15px] ">
          <div className="w-full">
            <input
              placeholder="Brand name"
              autoComplete="street-address"
              type="text"
              className="w-full bg-[white] border outline-none border-black px-[10px] rounded-[15px] h-[4rem] focus:border-opacity-70 border-opacity-30 transition duration-300 "
            />
          </div>
          <div className="w-full ">
            <select className="w-full bg-[white] border outline-none border-black px-[10px] rounded-[15px] h-[4rem] focus:border-opacity-70 border-opacity-30 transition duration-300 text-black text-opacity-[50%]">
              <option className="">Brand Colour</option>
              <option>Red</option>
              <option>Green</option>
              <option>Blue</option>
              <option>Yellow</option>
              <option>White</option>
            </select>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4 mt-[10px] ">
          <input
            placeholder="Username"
            autoComplete="street-address"
            type="text"
            className="w-full bg-[white] border outline-none border-black px-[10px] rounded-[15px] h-[4rem] focus:border-opacity-70 border-opacity-30 transition duration-300 "
          />

          <input
            placeholder="Phone number"
            autoComplete="street-address"
            type="text"
            className="w-full bg-[white] border outline-none border-black px-[10px] rounded-[15px] h-[4rem] focus:border-opacity-70 border-opacity-30 transition duration-300 "
          />
        </div>
        </div>

        <div className="flex justify-between mt-20  md:mt-48 text-sm">
          <button
            className="px-[25px] py-[10px] rounded-[35px] uppercase border border-black hover:opacity-[80%] transition-all ease-in-out duration-300"
            onClick={() => {
              setStep((prev) => prev - 1);
            }}
          >
            Back
          </button>
          <button
            className="px-[25px] py-[10px] hover:opacity-[80%] transition-all ease-in-out duration-300 rounded-[35px] uppercase  text-white bg-black"
            onClick={() => {
              setStep((prev) => prev + 1);
            }}
          >
            Next
          </button>
        </div>
      </form>
    
  );
};

export default BrandDetails;
