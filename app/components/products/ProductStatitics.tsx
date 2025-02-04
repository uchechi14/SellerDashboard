import React from 'react'


interface ProductStatiticsProps {
    name: string;
    number: number;

}

const ProductStatitics: React.FC<ProductStatiticsProps> = ({name, number}) => {
  return (
    <div className="flex justify-between w-full ">
           <div className="w-full justify-center flex py-[20px] bg-[#F1EFE8] rounded-[20px] ">
           <div className="w-[85%] flex justify-between flex-col">
                <div className="flex justify-between">
                    <div>
                    <h1 className="text-[16px] font-medium">{name}</h1>
                    <p className="text-[24px] font-semibold">{number} Times</p>
                    </div>
                    <div></div>
                </div>
                <div className="flex justify-between mt-3">
                    <div className='text-[15px]'>Since this month</div>
                    <div className='text-[13px]'>23.65% </div>
                </div>
            </div>
           </div>
        </div>
  )
}

export default ProductStatitics