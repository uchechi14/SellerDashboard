import BaseLayout from "../../BaseLayout";
import Link from "next/link";
import Image from "next/image";
import productImage from "../../../public/detailImage.png";
import { BiSolidLeftArrow } from "react-icons/bi";

import ProductStatitics from "@/app/components/products/ProductStatitics";

import ProductOverview from "@/app/components/products/ProductOverview";
import ProductOrders from "@/app/components/products/ProductOrders";

interface Props {
  params: { productId: string };
}

export default async function ProductDetails({ params }: Props) {
  const { productId } = await params;

  if (!productId) {
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
      <div className="w-full bg-white md:max-w-[200rem] mx-auto min-h-[100vh] flex justify-center py-5 rounded-[20px] mt-5">
        <div className="w-[95%]">
          <Link href="/product">
            <div className="flex items-center text-[13px] gap-2">
              <BiSolidLeftArrow /> BACK TO PRODUCTS
            </div>
          </Link>
          <ProductOverview slug={productId} />

          {/* PRODUCT STATS */}
          {/* PRODUCT STATS */}
          {/* PRODUCT STATS */}
          {/* PRODUCT STATS */}
          {/* PRODUCT STATS */}
          {/* <div className="mt-6">
            <h1 className="text-[20px] font-Helevetica">Product Statistics</h1>
            <div className="gap-5 mt-[20px] grid grid-cols-mediaGrid xl:flex xl:w-full">
              <ProductStatitics name="LIKED" number={430} />
              <ProductStatitics name="ADDED TO BAG" number={4343} />
              <ProductStatitics name="PAID FOR" number={23} />
            </div>
          </div> */}

          <ProductOrders />
        </div>
      </div>
    </BaseLayout>
  );
}
