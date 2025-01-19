import Image from "next/image";
import productImage from "../../../public/NEWARRIVALS.png"
import { useState } from "react";
import Link from "next/link";


interface ProductsProps {
    showArchived: boolean | undefined;
    activeTab: 'all' | 'posted' | 'archived';
}
const ProductsItems = [
    {
        name: 'Mens high neck black turtle polo shirt',
        image: productImage,
        price: '₦ 23,000',
        sold: '435',
        id: 1,
        isArchived: true,

    },
    {
        name: 'Mens high neck black turtle polo shirt',
        image: productImage,
        price: '₦ 23,000',
        sold: '435',
        id: 2,
        isArchived: true,
    },
    {
        name: 'Mens high neck black turtle polo shirt',
        image: productImage,
        price: '₦ 23,000',
        sold: '435',
        id: 3,
        isArchived: false,
    },
    {
        name: 'Mens high neck black turtle polo shirt',
        image: productImage,
        price: '₦ 23,000',
        sold: '435',
        id: 4,
        isArchived: false,
    },

]

const Products: React.FC<ProductsProps> = ({ showArchived, activeTab }) => {
    // const [products, setProducts] = useState<Product[]>([]);

    // Filter products based on activeTab
    const filteredProducts = ProductsItems.filter(product => {
        if (activeTab === 'all') {
            return true; // Show all products
        }
        return product.isArchived === (activeTab === 'archived');
    });

    return(
        <div className="w-full grid grid-cols-cardGrid gap-4">
       {filteredProducts.map((item) => (
         <div className="w-full flex justify-center bg-[#F1EFE8] rounded-[20px] py-3" key={item.id}>
         <div className="w-[93%]">
             <div className="w-full aspect-square rounded-[20px] overflow-hidden">
                <Image src={item.image} alt="product" className="w-full h-full object-contain object-center " />   
             </div>
             <div className="border-[#0000003D] border bg-[#FFFFFF99] opacity-[60%] relative top-[-270px] left-[20px] flex py-[7px] w-[100px] justify-center items-center rounded-full gap-2">
                    <div className= {`size-[8px] rounded-full ${item.isArchived ?  "bg-[#F5C799]": 'bg-[#1EE8A8]'}`}></div>
                    <p className="text-[13px]">{item.isArchived ? 'Archived' : 'Active'}</p>
                </div>
             <div className="">
                 <div className="flex justify-between">
                     <p className="text-[13px] w-[50%]">{item.name}</p>
                    <Link href={`/product/${item.id}`}>
                    <button className="px-[13px] text-white py-[5px] bg-[#0171E3] text-[13px] rounded-full" type="submit">See details</button>
                    </Link>
                 </div>
                 <div className="flex justify-between items-center mt-3">
                     <p className="text-[20px]">{item.price}</p>
                     <p className="text-[11px] text-black opacity-[50%]">{item.sold}PIECES SOLD</p>
                 </div>
             </div>
         </div>
     </div>
       ))}
        </div>
    )
}
export default Products;