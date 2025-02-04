'use client'
import BaseLayout from "@/app/BaseLayout";
import Header from "@/app/components/dashboard/Header";
import ProductUploaded from "@/app/components/products/ProductUploaded";
import Link from "next/link";
import {  useState } from "react";
import { BiSolidLeftArrow } from "react-icons/bi";
import { LuPlus } from "react-icons/lu";
import ColorPicker from "@/app/components/products/ColorPicker";
import {  CirclePicker  } from "react-color"







export default function UploadProducts () {

   const [isOpen, setIsOpen] = useState<boolean>(false)

   const handleSubmit = (): void =>{
    setIsOpen(!isOpen)
   }
    
   const [inputValue, setInputValue] = useState<string>("")
   const [selectColor, setSelectColor] = useState<string>('#fff')
   
   const customColors= ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF"]

   console.log(customColors)
   console.log(inputValue)
   console.log(selectColor)


   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value.trim().toLowerCase()
    setInputValue(color)

    if(isValidColor(color)) {
        setSelectColor(color)
    }
   }

   const isValidColor = (color: string): boolean => {
    const s = new Option().style;
    s.color = color;
    return !!s.color;
};
  
  
interface ColorResult {
    hex: string;
    // other properties that might come from your color picker
}

const handleChangeColor = (color: ColorResult) => {
    setSelectColor(color.hex)
    setInputValue(color.hex)
}

 
    return(
        <BaseLayout>
            <div>
                <Header title="Upload Products" note="Post and upload your products for purchase"/>


                <form className="w-full bg-white flex justify-center py-5 rounded-[20px] mt-5" onSubmit={(e) => {e.preventDefault(); handleSubmit()}}>
                    <div className="w-[95%]">
                    <Link href="/product">
                    <div className="flex items-center text-[13px] gap-2"><BiSolidLeftArrow /> BACK TO PRODUCTS</div>
                    </Link>
                    <div className="mt-5">
                        <p className="text-[18px] text-black opacity-[50%] mt-2">Add product name</p>
                        <div className="w-full">
                            <input type='text' placeholder="Enter name" className="bg-[#F0F0F0] pl-[20px] w-full rounded-[15px] py-[15px] outline-none"/>
                        </div>
                    </div>
                    <div className="mt-5">
                        <p className="text-[18px] text-black opacity-[50%] mt-2">Add product Description</p>
                        <div className="w-full">
                            <textarea  placeholder="Enter description" className="bg-[#F0F0F0] pl-[20px] w-full rounded-[15px] py-[15px] outline-none"/>
                        </div>
                    </div>
                    <div className="mt-5">
                        <p className="text-[18px] text-black opacity-[50%] mt-2">Enter price</p>
                        <div className="w-full flex items-center">
                            <input type='text' placeholder="Enter price" className="bg-[#F0F0F0] pl-[20px] w-full rounded-[15px] py-[15px] outline-none"/>
                            <div className="w-[55px] rounded-[20px] py-[6px] bg-white absolute right-[75px] flex justify-center items-center">₦</div>
                        </div>
                    </div>
                    <div className="mt-5">
                        <p className="text-[18px] text-black opacity-[50%] mt-2">Enter product type</p>
                        <div className="w-full">
                            <select className="w-full bg-[#e0e0e0] outline-none rounded-[15px] py-[15px] px-[20px] text-[18px] text-black opacity-[50%]">
                                <option className="">POLO</option>
                                <option>JEAN</option>
                                <option>SKIRT</option>
                                <option>POLO</option>
                            </select>
                        </div>
                    </div>
                    <div className="mt-5">
                        <p className="text-[18px] text-black opacity-[50%] mt-2">Enter Gender</p>
                        <div className="w-full">
                            <select className="w-full bg-[#e0e0e0] outline-none rounded-[15px] py-[15px] px-[20px] text-[18px] text-black opacity-[50%]">
                                <option className=" ">MALE</option>
                                <option>FEMALE</option>
                            </select>
                        </div>
                    </div>
                    <div className="border-t-[1px] border-[#D9D9D9] w-full mt-5"></div>

                    <div className="mt-5">
                    <p className="text-[18px] text-black opacity-[50%] mt-2">Add display image</p>
                    <label className="size-[300px] bg-[#E9E9E9] rounded-[20px] block mobile:w-full" htmlFor="upload-button"> 
                    <input
                        type="file"
                        id="upload-button"
                        className="hidden" />
                        <div className="flex justify-center items-center relative top-[45%] text-[25px] ">
                        <LuPlus />
                        </div>
                    </label>
                      <CirclePicker  
                        colors={customColors}
                        circleSize={36}
                        circleSpacing={10}
                        className="mt-4" color = {selectColor} onChangeComplete={handleChangeColor} />
                        <input type="text" value={inputValue} onChange={handleInputChange} className="w-[170px] mt-2 border-2 outline-none px-2 rounded-md py-1 border-[#E9E9E9]" />
                        <p>Selected Color: <span style={{ color: selectColor }}>{selectColor}</span></p>
                    </div>

                    <div className="mt-5">
                    <p className="text-[18px] text-black opacity-[50%] mt-2">Add support images</p>
                    <div className=" w-full flex flex-wrap gap-3 ">
                    <ColorPicker/>
                    <ColorPicker/>
                    <ColorPicker/>
                    <ColorPicker/>
                    <ColorPicker/>
                    <ColorPicker/>
                  
                    </div>
                    
                    </div>
                    <div className="border-t-[1px] border-[#D9D9D9] w-full mt-5"></div>


                    <div className="mt-7">
                    <p className="text-[18px] text-black opacity-[50%] mt-5">Add sizes</p>
                     <div className="flex gap-3 mt-5 flex-wrap">
                        <div className="border border-black px-3 py-[2px] rounded-full">Small</div>
                        <div className="border border-black px-3 py-[2px] rounded-full">Medium</div>
                        <div className="border border-black px-3 py-[2px] rounded-full">Large</div>
                        <div className="border border-black px-3 py-[2px] rounded-full">XL</div>
                        <div className="border border-black px-3 py-[2px] rounded-full">XXL</div>
                    </div>
                    </div>

                    <div className="border-t-[1px] border-[#D9D9D9] w-full mt-11"></div>

                    <div className="mt-5">
                        <p className="text-[18px] text-black opacity-[50%] mt-2">What comes in the box</p>
                        <div className="w-full">
                            <textarea  placeholder="Enter info" className="border border-[#F0F0F0] pl-[20px] w-full rounded-[15px] py-[15px] outline-none"/>
                        </div>
                    </div>
                    <div className="mt-5">
                        <p className="text-[18px] text-black opacity-[50%] mt-2">Extra information</p>
                        <div className="w-full">
                            <textarea  placeholder="Enter info" className="border border-[#F0F0F0] pl-[20px] w-full rounded-[15px] py-[15px] outline-none"/>
                        </div>
                    </div>
                    <div className="flex justify-end gap-3">
                        <button className="px-[13px] text-white py-[7px] bg-[#0171E3] text-[16px] rounded-full" type="submit">Upload</button>
                        <button className="px-[13px] py-[7px] bg-[#000000] text-[16px] text-white rounded-full" >Archive</button>
                    </div>


                    </div>
                </form>

                <div className={`bg-bgTrans justify-center flex items-center w-full fixed  top-0 left-0 h-screen ${isOpen ? 'block' : 'hidden'}`}>
                    <ProductUploaded handleSubmit={handleSubmit}/>
                </div>
            </div>
        </BaseLayout>
    )
}