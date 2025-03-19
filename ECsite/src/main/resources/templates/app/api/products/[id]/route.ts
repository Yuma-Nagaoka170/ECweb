import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"
import type { Product } from "@/lib/types"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const product = await executeQuery<Product[]>({
      query: "SELECT * FROM products WHERE id = ?",
      values: [params.id],
    })

    if (!product || product.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json(product[0])
  } catch (error) {
    console.error("Error fetching product:", error)
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 })
  }
}

