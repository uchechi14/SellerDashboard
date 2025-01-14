import BaseLayout from "@/app/BaseLayout";
import Header from "@/app/components/dashboard/Header";
import ImageInput from "@/app/components/products/ImageInput";
import Link from "next/link";
import { BiSolidLeftArrow } from "react-icons/bi";
import { LuPlus } from "react-icons/lu";



export default function UploadProducts () {
    return(
        <BaseLayout>
            <div>
                <Header title="Upload Products" note="Post and upload your products for purchase"/>


                <form className="w-full bg-white flex justify-center py-5 rounded-[20px] mt-5">
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
                    <div className="border-t-[1px] border-[#D9D9D9] w-full mt-5"></div>

                    <div className="mt-5">
                    <p className="text-[18px] text-black opacity-[50%] mt-2">Add display image</p>
                    <label className="size-[300px] bg-[#E9E9E9] rounded-[20px] block " htmlFor="upload-button"> 
                    <input
                        type="file"
                        id="upload-button"
                        className="hidden" />
                        <div className="relative top-[130px] left-[140px] text-[25px]">
                        <LuPlus />
                        </div>
                    </label>
                    </div>

                    <div className="mt-5">
                    <p className="text-[18px] text-black opacity-[50%] mt-2">Add support images</p>
                    <div className="flex w-full gap-5 flex-wrap mt-5">
                    <ImageInput/>
                    <ImageInput/>
                    <ImageInput/>
                    <ImageInput/>
                    <ImageInput/>
                    <ImageInput/>
                    <ImageInput/>
                    <ImageInput/>
                    <ImageInput/>
                    <ImageInput/>
                    <ImageInput/>
                    <ImageInput/>
                    <ImageInput/>
                    <ImageInput/>
                    </div>
                    
                    </div>
                    <div className="border-t-[1px] border-[#D9D9D9] w-full mt-5"></div>

                    <div className="mt-5">
                    <p className="text-[18px] text-black opacity-[50%] mt-2">Add color options</p>
                    <label className="size-[50px] bg-[#E9E9E9] rounded-full block " htmlFor="upload-button"> 
                    <input
                        type="file"
                        id="upload-button"
                        className="hidden" />
                        <div className="relative top-[9px] left-[12px] text-[25px]">
                        <LuPlus />
                        </div>
                    </label>
                    </div>

                    <div className="mt-5">
                    <p className="text-[18px] text-black opacity-[50%] mt-2">Add sizes</p>
                     <div className="flex gap-3">
                        <div className="border border-black px-3 py-[2px] rounded-full">Small</div>
                        <div className="border border-black px-3 py-[2px] rounded-full">Medium</div>
                        <div className="border border-black px-3 py-[2px] rounded-full">Large</div>
                        <div className="border border-black px-3 py-[2px] rounded-full">XL</div>
                        <div className="border border-black px-3 py-[2px] rounded-full">XXL</div>
                    </div>
                    </div>

                    <div className="border-t-[1px] border-[#D9D9D9] w-full mt-5"></div>

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
                        <button>Upload</button>
                        <button>Upload</button>
                    </div>


                    </div>
                </form>
            </div>
        </BaseLayout>
    )
}