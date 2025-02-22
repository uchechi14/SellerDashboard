import { LuPlus } from "react-icons/lu";

export default function ImageInput() {
  return (
    <label
      className="size-[150px] relative bg-[#E9E9E9] rounded-[20px] block mobile:w-full"
      htmlFor="upload-button"
    >
      <input type="file" id="upload-button" className="hidden" />
      <div className="flex justify-center absolute items-center  top-[45%] text-[25px] ">
        <LuPlus />
      </div>
    </label>
  );
}
