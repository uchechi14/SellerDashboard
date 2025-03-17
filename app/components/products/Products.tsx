import { PriceFormat } from "@/app/utils/PriceFormat";
import Image from "next/image";
import Link from "next/link";

interface ProductsProps {
  products: any[];
  activeTab: "all" | "posted" | "archived";
}

const Products: React.FC<ProductsProps> = ({ products, activeTab }) => {
  const filteredProducts = products.filter((product) => {
    if (activeTab === "all") {
      return true; // Show all products
    }
    return product.isArchived === (activeTab === "archived");
  });

  return (
    <div className="w-full grid grid-cols-cardGrid gap-4">
      {filteredProducts.map((item) => (
        <div
          className="w-full flex justify-center relative bg-[#F1EFE8] rounded-[20px] py-3"
          key={item.id}
        >
          <div className="w-[93%] flex flex-col gap-[1.6rem] relative">
            <div className="w-full aspect-square rounded-[20px] overflow-hidden">
              <img
                src={item.images[0]?.image_url || "/placeholder.jpg"} // ✅ Use product image URL
                alt="product"
                className="w-full h-full object-cover"
                // width={300}
                // height={300}
              />
            </div>
            <div className="border-black/60 border bg-white/50 backdrop-blur-md absolute flex py-[7px] px-[1rem] top-[1rem] left-[1rem] justify-center items-center rounded-full gap-2">
              <div
                className={`size-[8px] rounded-full ${
                  item.isArchived ? "bg-[#F5C799]" : "bg-[#1EE8A8]"
                }`}
              ></div>
              <p className="uppercase text-sm">
                {item.isArchived ? "Archived" : "Active"}
              </p>
            </div>
            <div className="">
              <div className="flex justify-between">
                <p className="text-[13px] w-[50%]">{item.name}</p>
                <Link href={`/product/${item.slug}`} key={item.id}>
                  <button
                    className="px-[13px] text-white py-[5px] bg-[#0171E3] text-[13px] rounded-full"
                    type="submit"
                  >
                    See details
                  </button>
                </Link>
              </div>
              <div className="flex justify-between items-center mt-3">
                <p className="text-[20px]"> ₦ {PriceFormat(item.price)}</p>
                <p className="text-[11px] text-black opacity-[50%]">
                  {item.sold || 0} PIECES SOLD
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
