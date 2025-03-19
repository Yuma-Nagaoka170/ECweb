import { getProductById } from "@/lib/actions"
import ProductDetail from "@/components/product-detail"
import { notFound } from "next/navigation"

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id)

  if (!product) {
    notFound()
  }

  return <ProductDetail product={product} />
}

