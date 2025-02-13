/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { FaEdit } from "react-icons/fa";
// import { useState } from "react";
import { LuPlus } from "react-icons/lu";
import { MdErrorOutline } from "react-icons/md";

type props = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  handleChange: (e: React.ChangeEvent<HTMLElement>) => void;
  values: any;
};

const BrandOffice = ({
  setStep,
  values,
  handleChange,
}: props) => {
  const imageInputs = [
    { key: "brandImage1", label: "First Image" },
    { key: "brandImage2", label: "Second Image" },
    { key: "brandImage3", label: "Third Image" },
  ];
  return (
    <form>
      <div className="w-full bg-white rounded-[12px] flex gap-3 px-3 py-3">
        <MdErrorOutline className="text-[25px]" />
        <p className="text-[13px]">
          Step 3 and 4 is optional and can be skipped, upon filling this and
          submitting you are eligible to be verified as a seller and improve
          your chance of sales
        </p>
      </div>
      <p className="text-[15px] mt-5">BRAND OFFICE PICTURES</p>
      <div className="grid grid-cols-3 gap-3 w-full items-center mt-[10px] ">
        {imageInputs.map((input, index) => (
          <label
            key={input.key}
            className="aspect-[1/1] h-fit mt-[10px] bg-[#F3F3F3] flex justify-center items-center rounded-[10px] md:aspect-[1/0.7] md:rounded-[20px] relative mobile:w-full"
            htmlFor={`upload-button-${index}`}
          >
            <input
              type="file"
              id={`upload-button-${index}`}
              accept="image/*"
              name={input.key}
              onChange={handleChange}
              className="hidden"
            />

            {values[input.key] ? (
              <>
                <img
                  src={URL.createObjectURL(values[input.key])}
                  alt={`Selected ${input.label}`}
                  className="w-full h-full object-cover rounded-[20px]"
                />
                <p
                  style={{ transition: "0.2s linear" }}
                  className="flex z-[10] w-full h-full justify-center items-center bg-black bg-opacity-30 cursor-pointer hover:text-white hover:bg-opacity-55 rounded-[20px] absolute top-0 text-red-600 text-lg"
                >
                  <FaEdit />
                </p>
              </>
            ) : (
              <div className="flex justify-center items-center relative text-[25px]">
                <LuPlus />
              </div>
            )}
          </label>
        ))}
      </div>
      <div></div>
      <div className="mt-[25px] ">
        <p className="text-[15px] mt-3">BRAND RESIDENTIAL DETAILS</p>
        <div className="grid md:grid-cols-2 gap-4 mt-2">
          <input
            placeholder="Street name"
            autoComplete="street-address"
            type="text"
            onChange={handleChange}
            name="brandStreetName"
            value={values.brandStreetName || ""}
            className="w-full bg-[white] border outline-none border-black px-[10px] rounded-[15px] h-[4rem] focus:border-opacity-70 border-opacity-30 transition duration-300 "
          />

          <input
            placeholder="Street number"
            autoComplete="street-address"
            type="text"
            onChange={handleChange}
            name="brandStreetNumber"
            value={values.brandStreetNumber || ""}
            className="w-full bg-[white] border outline-none border-black px-[10px] rounded-[15px] h-[4rem] focus:border-opacity-70 border-opacity-30 transition duration-300 "
          />

          <input
            placeholder="city"
            autoComplete="street-address"
            type="text"
            onChange={handleChange}
            name="brandCity"
            value={values.brandCity || ""}
            className="w-full bg-[white] border outline-none border-black px-[10px] rounded-[15px] h-[4rem] focus:border-opacity-70 border-opacity-30 transition duration-300 "
          />
          <select
            className="w-full bg-[white] border outline-none border-black px-[10px] rounded-[15px] h-[4rem] focus:border-opacity-70 border-opacity-30 transition duration-300 text-black text-opacity-[50%]"
            onChange={handleChange}
            name="brandCountry"
            value={values.brandCountry}
          >
            <option value="">Country</option>
            <option value="Nigeria">Nigeria</option>
            <option>Ghana</option>
          </select>
        </div>
      </div>
      <div className="flex justify-between mt-12 text-sm">
        <button
          className="px-[25px] py-[10px] rounded-[35px] uppercase border border-black hover:opacity-[80%] transition-all ease-in-out duration-300"
          onClick={() => {
            setStep((prev) => prev - 1);
          }}
        >
          Back
        </button>
        <button
          type="submit"
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

export default BrandOffice;
