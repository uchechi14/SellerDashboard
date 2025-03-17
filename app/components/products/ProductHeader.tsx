/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import Header from "../dashboard/Header";
import { IoCartOutline } from "react-icons/io5";
import { PiFireSimple } from "react-icons/pi";
import { BsBoxSeam } from "react-icons/bs";
import Link from "next/link";
import { supabase } from "@/app/utils/superBaseClient";
import { UserUserData } from "@/app/utils/userData";
import Products from "./Products";
import ProductLoader from "../Loaders/ProductLoader";

const ProductHeader = () => {
  const { user } = UserUserData(); // ✅ Get the logged-in user
  const [activeTab, setActiveTab] = useState<"all" | "posted" | "archived">(
    "all"
  );
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // ✅ Track loading state

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("product")
        .select("id, name, price, slug, images (image_url)")
        .eq("seller_id", user?.userId) // ✅ Fetch only this seller's products
        .eq("images.is_default", true); // ✅ Get only the default image

      if (error) {
        console.error("Error fetching products:", error);
      } else {
        console.log(data);
        setProducts(data || []);
      }
      setLoading(false);
    };

    if (user?.userId) {
      fetchProducts();
    }
  }, [user?.userId]);
  const handleTabChange = (tab: any) => {
    setActiveTab(tab);
  };

  const tabs = [
    {
      id: "all",
      label: "All products",
      icon: <IoCartOutline className="text-[17px]" />,
    },
    {
      id: "posted",
      label: "Posted products",
      icon: <PiFireSimple className="text-[17px]" />,
    },
    {
      id: "archived",
      label: "Archived products",
      icon: <BsBoxSeam className="text-[17px]" />,
    },
  ];

  return (
    <div>
      <Header
        title="Products"
        note="Keep tracks of all your uploaded products"
      />
      <div className="mt-11">
        <div className="flex justify-between items-center border-b-[1px] border-b-[#D9D9D9] pb-[20px] ">
          <div className="flex items-center gap-[40px]">
            {tabs.map((items) => (
              <p
                key={items.id}
                className={`text-reponsiveText font-medium flex flex-col md:flex-row text-center items-center gap-2 cursor-pointer ${
                  activeTab === items.id ? "text-[#0171E3] border-b-[1px]" : ""
                }`}
                onClick={() => handleTabChange(items.id)}
              >
                {items.icon} {items.label}
              </p>
            ))}
          </div>
          <div>
            <Link href="product/uploadProduct">
              <button className="bg-[#000000] px-[1rem] text-white text-reponsiveText rounded-full py-[7px]">
                Upload new products
              </button>
            </Link>
          </div>
        </div>
        <div className="w-full rounded-[20px] bg-white py-4 flex justify-center mt-6">
          <div className="w-[97%] mt-3 ">
            {loading ? (
              <ProductLoader /> // ✅ Show loader while fetching
            ) : (
              <Products products={products} activeTab={activeTab} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductHeader;
