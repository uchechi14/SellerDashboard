"use client";
import React from "react";

type props = {
  step: number;
};
const SideBarAccount = ({ step }: props) => {
  const accountArray = [
    {
      text: "Personal details",
      step: "1",
    },
    {
      text: "Brand details",
      step: "2",
    },
    {
      text: "KYC",
      step: "3",
    },
    {
      text: "Document upload",
      step: "1",
    },
  ];

  return (
    <div className="md:w-[400px] w-full md:h-[95vh] py-[1rem] fixed md:top-[50%] top-0 md:translate-y-[-50%] left-0 md:left-[1rem]  overflow-hidden px-[1rem] z-[10] md:px-[2rem] bg-[#E2E4FF] justify-center md:rounded-[20px] flex-col flex ">
      <div className=" gap-[1rem] flex overflow-y-auto flex-col">
        <div className="">
          <h1 className="md:text-[20px] font-Helevetica">CUBBY</h1>
          <p className="md:text-[35px]">Create account</p>
        </div>
        <div>
          <div className="flex md:justify-start justify-between md:flex-col">
            {accountArray.map((item, index) => (
              <div key={index} className="flex md:flex-row  w-full md:text-base text-sm  md:items-start items-center flex-col  gap-2 justify-between md:w-fit">
                <div className="flex md:flex-col items-center gap-1">
                  <div
                    style={{ transition: "0.4s linear" }}
                    className={`size-[45px] flex justify-center  mt-1 items-center flex-shrink-0 rounded-full ${
                      step != index + 1
                        ? "bg-[#B6C6D8]"
                        : " bg-[#0171E3]  text-white"
                    }`}
                  >
                    {index + 1}
                  </div>
                  {index != accountArray.length - 1 && (
                    <div
                      style={{ transition: "0.4s linear" }}
                      className={` ${
                        step != index + 1
                          ? "border-[#B6C6D8]"
                          : " border-[#0171E3]"
                      } border-2 border-[#B6C6D8] md:w-auto hidden md:flex w-full  md:h-[2rem] flex-shrink-0`}
                    ></div>
                  )}
                </div>
                <p className="md:text-base text-xs text-center md:text-start md:mt-[12px]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBarAccount;
