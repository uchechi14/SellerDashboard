"use client";
import React, { useState } from "react";
import SideBarAccount from "../components/accountComponents/SideBarAccount";
import AccountDetail from "../components/accountComponents/AccountDetail";
import BrandDetails from "../components/accountComponents/BrandDetails";
import BrandOffice from "../components/accountComponents/BrandOffice";
import Upload from "../components/accountComponents/Upload";
import CreatedAccount from "../components/accountComponents/CreatedAccount";


const Home = () => {
  const [step, setStep] = useState(1);
 
  return (
    <div className="w-full flex justify-center bg-[#F1EFE8] items-center min-h-[100vh]  ">
           {step == 5 && <CreatedAccount setStep={setStep}/> }
      <div className="md:w-[95%] w-full px-[1rem] md:px-0 flex justify-between items-center md:gap-[35px] ">
        <SideBarAccount step={step} />
        <div className=" w-[100%] md:mt-0 mt-[13rem] md:py-[3rem] pb-[3rem] md:pl-[450px] md:pr-[1rem]">
          {step == 1 && <AccountDetail setStep={setStep} />}
          {step == 2 && <BrandDetails setStep={setStep} />}
          {step == 3 && <BrandOffice setStep={setStep} />}
          {step == 4 && <Upload setStep={setStep} />}
  
        </div>
      </div>
    </div>
  );
};

export default Home;
