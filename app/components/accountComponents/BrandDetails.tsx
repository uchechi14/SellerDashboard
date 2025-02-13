/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
// import Image from "next/image";
import { FaEdit } from "react-icons/fa";
// import React, { useState } from "react";
import { LuPlus } from "react-icons/lu";

type props = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  values: any;
  handleChange: (e: React.ChangeEvent<HTMLElement>) => void;
};

const BrandDetails = ({ setStep, values, handleChange }: props) => {
  return (
    <form>
      <div className=" flex flex-col md:justify-between">
        <div className=" ">
          <p className="">YOUR RESIDENTIAL DETAILS</p>
          <div className="grid md:grid-cols-2 gap-4 mt-2">
            <input
              placeholder="Street name"
              autoComplete="address-level1"
              type="text"
              onChange={handleChange}
              value={values.streetName || ""}
              name="streetName"
              required
              className="w-full bg-[white] border outline-none border-black px-[10px] rounded-[15px] h-[4rem] focus:border-opacity-70 border-opacity-30 transition duration-300 "
            />

            <input
              placeholder="Street number"
              autoComplete="address-level2"
              type="text"
              onChange={handleChange}
              name="streetNumber"
              required
              value={values.streetNumber || ""}
              className="w-full bg-[white] border outline-none border-black px-[10px] rounded-[15px] h-[4rem] focus:border-opacity-70 border-opacity-30 transition duration-300 "
            />

            <input
              placeholder="City"
              autoComplete="street-level2"
              type="text"
              onChange={handleChange}
              name="city"
              required
              value={values.city || ""}
              className="w-full bg-[white] border outline-none border-black px-[10px] rounded-[15px] h-[4rem] focus:border-opacity-70 border-opacity-30 transition duration-300 "
            />
            <select
              className="w-full bg-[white] border outline-none border-black px-[10px] rounded-[15px] h-[4rem] focus:border-opacity-70 border-opacity-30 transition duration-300 text-black text-opacity-[50%]"
              onChange={handleChange}
              name="country"
              autoComplete="country"
              value={values.country}
            >
              <option className="">Country</option>
              <option>hhh</option>
              <option>hhh</option>
            </select>
          </div>
        </div>

        <p className="text-[15px] mt-3">BRAND DETAILS</p>
        <div className=" ">
          <label
            className="size-[80px] bg-[#F3F3F3] rounded-[20px] md:rounded-[100%] overflow-hidden relative block mobile:w-[70%] cursor-pointer mt-[10px]"
            htmlFor="upload-button"
          >
            <input
              type="file"
              id="upload-button"
              accept="image/*"
              name="brandLogo"
              // value={values.brandLogo || ""} // required
              onChange={handleChange} // Add this
              className="hidden"
            />

            {values?.brandLogo ? (
              <>
                <img
                  src={URL.createObjectURL(values.brandLogo)}
                  alt="Selected"
                  className="w-full h-full object-cover rounded-[20px]"
                />
                <p
                  style={{ transition: "0.2s linear" }}
                  className="flex z-[10] w-full rounded-[20px]  h-full justify-center items-center bg-black bg-opacity-30 cursor-pointer hover:text-white hover:bg-opacity-55 absolute top-0 text-red-600  text-lg "
                >
                  <FaEdit />{" "}
                </p>
              </>
            ) : (
              <div className="flex justify-center items-center relative top-[35%] text-[25px]">
                <LuPlus />
              </div>
            )}
          </label>
          <p className="text-[14px] mt-2">Add brand logo</p>
        </div>
        <div className="grid md:grid-cols-2 gap-4 mt-[15px] ">
          <div className="w-full">
            <input
              placeholder="Brand name"
              autoComplete="street-address"
              type="text"
              onChange={handleChange}
              name="brandName"
              required
              value={values.brandName || ""}
              className="w-full bg-[white] border outline-none border-black px-[10px] rounded-[15px] h-[4rem] focus:border-opacity-70 border-opacity-30 transition duration-300 "
            />
          </div>
          <div className="w-full">
            <select
              className="w-full bg-[white] border outline-none border-black px-[10px] rounded-[15px] h-[4rem] focus:border-opacity-70 border-opacity-30 transition duration-300 text-black text-opacity-[50%]"
              onChange={handleChange}
              name="color"
              value={values.color}
            >
              <option value="Brand COlour">Brand Colour</option>
              <option value="Red">Red</option>
              <option value="Green">Green</option>
              <option value="Blue">Blue</option>
              <option value="Yellow">Yellow</option>
              <option value="white">White</option>
            </select>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4 mt-[10px] ">
          {/* <input
            placeholder="Username"
            autoComplete="street-address"
            type="text"
            onChange={handleChange}
            name="userName"
            required
            value={values.userName || ""}
            className="w-full bg-[white] border outline-none border-black px-[10px] rounded-[15px] h-[4rem] focus:border-opacity-70 border-opacity-30 transition duration-300 "
          /> */}

          <input
            placeholder="Phone number"
            autoComplete="street-address"
            type="text"
            onChange={handleChange}
            name="phoneNumber"
            required
            value={values.phoneNumber || ""}
            className="w-full bg-[white] border outline-none border-black px-[10px] rounded-[15px] h-[4rem] focus:border-opacity-70 border-opacity-30 transition duration-300 "
          />
        </div>
      </div>

      <div className="flex justify-between mt-5   text-sm">
        <div></div>
        <button
          className="px-[25px] py-[10px] hover:opacity-[80%] transition-all ease-in-out duration-300 rounded-[35px] uppercase  text-white bg-black"
          type="submit"
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
