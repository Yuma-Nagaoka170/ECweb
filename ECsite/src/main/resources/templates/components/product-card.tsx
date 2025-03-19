import Link from "next/link"
import { ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group rounded-lg border overflow-hidden">
      <Link href={`/products/${product.id}`} className="block relative aspect-square overflow-hidden">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="object-cover w-full h-full transition-transform group-hover:scale-105"
        />
      </Link>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Link href={`/products/${product.id}`} className="block">
            <h3 className="font-medium text-lg line-clamp-1">{product.name}</h3>
          </Link>
          <span className="font-semibold">${product.price.toFixed(2)}</span>
        </div>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{product.description}</p>
        <Button className="w-full gap-2">
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </div>
  )
}

