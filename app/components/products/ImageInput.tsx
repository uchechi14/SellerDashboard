import { LuPlus } from "react-icons/lu";

export default function ImageInput() {
    return(
        <label className="size-[150px] bg-[#E9E9E9] rounded-[20px] " htmlFor="upload-button"> 
        <input
            type="file"
            id="upload-button"
            className="hidden" />
            <div className="relative top-[55px] left-[60px] text-[25px]">
            <LuPlus />
            </div>
        </label>
    )
}