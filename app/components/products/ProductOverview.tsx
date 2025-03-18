"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/app/utils/superBaseClient";
import { PriceFormat } from "@/app/utils/PriceFormat";
import ProductOverviewLoader from "../Loaders/ProductOverviewLoader";

const ProductOverview = ({ slug }: { slug: string }) => {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug) return;

      setLoading(true);
      const { data, error } = await supabase
        .from("product")
        .select("id, name, price,slug, images (image_url)")
        .eq("slug", slug)
        .single();

      console.log(data);
      if (error) {
        console.error("Error fetching product:", error);
      } else {
        setProduct(data);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="w-ful">
        <ProductOverviewLoader />
      </div>
    );
  }

  if (!product) {
    return <p className="text-center">Product not found</p>;
  }

  return (
    <div className=" w-full">
      <div className="w-full gap-[2rem] flex md:flex-row flex-col justify-between mt-4">
        {/* Main Product Image */}
        <div className="w-[20rem] flex-shrink-0 md:max-w-[40%] overflow-hidden aspect-[1/1.2] rounded-[20px]">
          <img
            src={product.images[0]?.image_url || "/placeholder.jpg"}
            alt={product.name}
            className="w-full h-full object-cover"
            width={500}
            height={600}
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col w-full">
          <h1 className="text-2xl font-bold mb-4 w-[20rem] max-w-[90%]">
            {product.name}
          </h1>
          <div className="flex items-center gap-2">
            <p className="text-[18px] ">₦ {PriceFormat(product.price)}</p>
            <p className="text-[13px] text-black opacity-[50%]">
              {product.sold} PIECES SOLD
            </p>
          </div>

          {/* Support Images */}
          <div className="mt-5 flex flex-col gap-[1rem]">
            <p className="text-black opacity-[50%] text-[13px] w-full">
              Support Images
            </p>
            <div className="flex flex-wrap  gap-[1rem]">
              {product.images.map((img: any, i: number) => (
                <div
                  key={i}
                  className="size-[70px] bg-black/10 rounded-[10px] overflow-hidden"
                >
                  <Image
                    src={img.image_url}
                    alt="support-image"
                    className="w-full object-cover"
                    width={70}
                    height={70}
                  />
                </div>
              ))}
            </div>{" "}
          </div>
        </div>

        {/* Edit Product Button */}
        <div>
          <Link
            href={`/product/edit/${product.slug}`}
            className="whitespace-nowrap"
          >
            <button className="px-[1rem] border border-black/50 py-[8px] bg-[#e8f3ff] rounded-full text-[#0171E3] text-reponsiveText3 shadow-md shadow-[#0171E314]">
              Edit Product
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductOverview;
