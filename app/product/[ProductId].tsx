'use client';

import BaseLayout from '../BaseLayout';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface ProductDetailProps {
  product: {
    id: number;
    name: string;
    price: string;
    image: string;
    description: string;
  } | null;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const router = useRouter();

  if (!product) {
    return (
      <BaseLayout>
        <div>
          <h1>Product not found</h1>
          <Link href="/product">
            Back to Products
          </Link>
        </div>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout>
      <div className="p-5 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
        <Image
          src={product.image}
          alt={product.name}
          width={800}
          height={400}
          className="w-full h-auto rounded-lg"
          priority
        />
        <p className="my-4">{product.description}</p>
        <p className="text-lg">
          <strong>Price:</strong> ${product.price}
        </p>
        <Link href="/product" className="text-blue-500 underline">
          Back to Products
        </Link>
      </div>
    </BaseLayout>
  );
};

export default ProductDetail;
