import { TbLetterX } from "react-icons/tb";

interface ProductUploadedProps {
    handleSubmit: () => void;
}

const ProductUploaded: React.FC<ProductUploadedProps> = ({handleSubmit}) => {
    return(
        <div className="w-[35%] rounded-[20px] bg-white flex justify-center items-center h-[300px]">
            <div className="w-[90%]">
            <div className={`size-[36px] rounded-full bg-[#F1F1F1] cursor-pointer flex justify-center items-center `} onClick={handleSubmit}>
            <TbLetterX />
            </div>
            <div className="flex flex-col items-center gap-2 ">
                <p className="text-[24px] font-bold w-[70%] text-center ">PRODUCTS UPLOADED SUCCESSFULLY</p>
                <p className="text-[15px] text-black opacity-[50%] w-[50%] text-center">Now You Can Track Purchases And Sales</p>
                <button className="bg-[#2F5BEB] px-[15px] py-[10px] text-[18px] text-white rounded-full">Go to Product</button>
            </div>
            </div>
        </div>
    )
}

export default ProductUploaded;