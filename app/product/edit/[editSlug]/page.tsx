import UploadProducts from "@/app/components/products/UploadProduct";
interface Props {
  params: { editSlug: string };
}

export default async function ProductDetails({ params }: Props) {
  const { editSlug } = await params;
  return <UploadProducts slug={editSlug} />;
}
