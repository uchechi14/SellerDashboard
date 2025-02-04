'use client';

import BaseLayout from '../../BaseLayout';
import Link from 'next/link';
import Image from 'next/image';
import productImage from "../../../public/detailImage.png"
import { BiSolidLeftArrow } from 'react-icons/bi';
import sideImage from "../../../public/sideImage.png"
import ProductStatitics from '@/app/components/products/ProductStatitics';

import { useState } from 'react';
import OrderTable from '@/app/components/orders/OrderTable';


interface ProductDetail {
  id: number;
  name: string;
  price: string;
  image: ImageBitmap;
  sold: string;
  alt: string;
}

const ProductDetail = [
  {
    id: 1,
    name: "Mens high neck black turtle polo shirt",
    price: "23,500",
    image: productImage,
    sold: "40",
    alt: 'menClothes'
  },
  // {
  //   id: 2,
  //   name: "Womejjjjjjjjjs high neck black turtle polo shirt",
  //   price: "23,500",
  //   image: productImage,
  //   sold: "40",
  //   alt: 'menClothes'
  // },
  // {
  //   id: 3,
  //   name: " shirt",
  //   price: "30,500",
  //   image: productImage,
  //   sold: "40",
  //   alt: 'menClothes'
  // },
  // {
  //   id: 4,
  //   name: "Girljjjjkkkkks high neck black turtle polo shirt",
  //   price: "23,500",
  //   image: productImage,
  //   sold: "40",
  //   alt: 'menClothes'
  // },
  ] 


  
  export default function ProductDetails() {
    const [activeTab, setActiveTab] = useState("all");
  
    const handleTabChange = (tab: string) => {
      setActiveTab(tab);
    };
  
    const getOrderStatus = (tab: string | undefined): string => {
      switch (tab) {
        case "NewOrders":
          return "new";
        case "PendingOrders":
          return "pending";
        case "SentOut":
          return "sent";
        case "Completed":
          return "completed";
        default:
          return "new";
      }
    };
  
    if (!ProductDetail) {
      return (
        <BaseLayout>
          <div>
            <h1>Product not found</h1>
            <Link href="/product">Back to Products</Link>
          </div>
        </BaseLayout>
      );
    }
  
    return (
      <BaseLayout>
        <div className="w-full bg-white flex justify-center py-5 rounded-[20px] mt-5">
          <div className="w-[95%]">
            <Link href="/product">
              <div className="flex items-center text-[13px] gap-2">
                <BiSolidLeftArrow /> BACK TO PRODUCTS
              </div>
            </Link>
            {ProductDetail.map((items, index) => (
              <div key={index} className="w-full gap-[6px] flex flex-wrap justify-between mt-4">
                <div className="w-[320px] h-auto rounded-[20px]">
                  <Image
                    src={items.image}
                    alt={items.alt}
                    className="w-full h-full rounded-lg object-contain"
                    priority
                  />
                </div>
                <div className="flex flex-col w-[50%] tablet:w-full">
                  <h1 className="text-[28px] font-bold mb-4 w-[60%] pc:w-full">{items.name}</h1>
                  <div className="flex items-center gap-2">
                    <p className="text-[18px]">₦{items.price}</p>
                    <p className="text-[13px] text-black opacity-[50%]">{items.sold} PIECES SOLD</p>
                  </div>
                  <div className="mt-5">
                    <p className="text-black opacity-[50%] size-[13px] w-full">Support Images</p>
                  </div>
                  <div className="flex flex-wrap mt-7">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="size-[70px]">
                        <Image src={sideImage} alt="sideImage" className="w-full object-contain" />
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <Link href="../product/editProduct">
                    <button className="px-[10px] py-[6px] bg-[#e8f3ff] border border-[#00000080] rounded-full text-[#0171E3] text-reponsiveText3 shadow-md shadow-[#0171E314]">
                      Edit Profile
                    </button>
                  </Link>
                </div>
              </div>
            ))}
  
            <div className="mt-6">
              <h1 className="text-[20px] font-Helevetica">Product Statistics</h1>
              <div className="gap-5 mt-[20px] grid grid-cols-mediaGrid xl:flex xl:w-full">
                <ProductStatitics name="LIKED" number={430} />
                <ProductStatitics name="ADDED TO BAG" number={4343} />
                <ProductStatitics name="PAID FOR" number={23} />
              </div>
            </div>
  
            <div className="mt-9 w-full">
              <OrderTable
                activeTab={activeTab as "all" | "NewOrders" | "PendingOrders" | "SentOut" | "Completed"}
                orderStatus={getOrderStatus(activeTab)}
                handleTabChange={handleTabChange}
              />
            </div>
          </div>
        </div>
      </BaseLayout>
    );
  }
  
