"use client";
import BaseLayout from "@/app/BaseLayout";

import ProductUploaded from "@/app/components/products/ProductUploaded";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function EditProduct() {
  const router = useRouter();
  useEffect(() => {
    router.push("/product");
  }, []);
  return (
    <BaseLayout>
      <div>
        <p className="">Redirecting ....</p>
      </div>
    </BaseLayout>
  );
}
