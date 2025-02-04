/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { FaRegEyeSlash } from "react-icons/fa6";

type props = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
};
const AccountDetail = ({ setStep }: props) => {
  return (
    <form className=" w-[100%]  ">
      <div>
        <p className="text-[15px] mt-3">YOUR PERSONAL DETAILS</p>
        <div className="grid md:grid-cols-2 gap-4 mt-2">
          <input
            placeholder="Street number"
            autoComplete="street-address"
            type="text"
            className="w-full bg-[white] border outline-none border-black px-[10px] rounded-[15px] h-[4rem] focus:border-opacity-70 border-opacity-30 transition duration-300 "
          />
          <input
            placeholder="Street number"
            autoComplete="street-address"
            type="text"
            className="w-full bg-[white] border outline-none border-black px-[10px] rounded-[15px] h-[4rem] focus:border-opacity-70 border-opacity-30 transition duration-300 "
          />
        </div>
      </div>
      <div className="mt-[25px] ">
        <p className="text-[15px] mt-3">YOUR RESIDENTIAL DETAILS</p>
        <div className="grid md:grid-cols-2 gap-4 mt-2">
          <input
            placeholder="Street name"
            autoComplete="street-address"
            type="text"
            className="w-full bg-[white] border outline-none border-black px-[10px] rounded-[15px] h-[4rem] focus:border-opacity-70 border-opacity-30 transition duration-300 "
          />

          <input
            placeholder="Street number"
            autoComplete="street-address"
            type="text"
            className="w-full bg-[white] border outline-none border-black px-[10px] rounded-[15px] h-[4rem] focus:border-opacity-70 border-opacity-30 transition duration-300 "
          />

          <input
            placeholder="Street number"
            autoComplete="street-address"
            type="text"
            className="w-full bg-[white] border outline-none border-black px-[10px] rounded-[15px] h-[4rem] focus:border-opacity-70 border-opacity-30 transition duration-300 "
          />
          <select className="w-full bg-[white] border outline-none border-black px-[10px] rounded-[15px] h-[4rem] focus:border-opacity-70 border-opacity-30 transition duration-300 text-black text-opacity-[50%]">
            <option className="">Country</option>
            <option>hhh</option>
            <option>hhh</option>
          </select>
        </div>
      </div>

      <div className="mt-[25px]">
        <p className="text-[15px] mt-3 ">PASSWORD</p>
        <div className="grid md:grid-cols-2 gap-4 mt-2">
          <div className="relative w-full max-w-md">
            <input
              placeholder="Your password"
              autoComplete="street-address"
              type="text"
              className="w-full px-4 py-2 pr-12 bg-[white] border outline-none border-black rounded-[15px] h-[4rem] focus:border-opacity-70 border-opacity-30 transition duration-300 "
            />

            <FaRegEyeSlash className="absolute right-3 top-1/2 -translate-y-1/2" />
          </div>
          <div className="relative w-full max-w-md">
            <input
              placeholder="Re-enter password"
              autoComplete="street-address"
              type="text"
              className="w-full px-4 py-2 pr-12 bg-[white] border outline-none border-black rounded-[15px] h-[4rem] focus:border-opacity-70 border-opacity-30 transition duration-300 "
            />

            <FaRegEyeSlash className="absolute right-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-20 text-sm">
        <button className="px-[25px] py-[10px] rounded-[35px] uppercase border border-black hover:opacity-[80%] transition-all ease-in-out duration-300">
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

export default AccountDetail;
