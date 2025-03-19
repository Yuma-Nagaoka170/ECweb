import { Filter } from "lucide-react"
import { Suspense } from "react"

import { Button } from "@/components/ui/button"
import ProductCard from "@/components/product-card"
import { getProducts } from "@/lib/actions"

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string }
}) {
  const category = searchParams.category
  const products = await getProducts(category)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">
          {category ? `${category.charAt(0).toUpperCase() + category.slice(1)}'s Collection` : "All Products"}
        </h1>
        <Button variant="outline" size="sm" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      <Suspense fallback={<div>Loading products...</div>}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Suspense>
    </div>
  )
}

