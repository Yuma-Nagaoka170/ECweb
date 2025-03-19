import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"
import type { Product } from "@/lib/types"

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const category = url.searchParams.get("category")

  try {
    let query = "SELECT * FROM products"
    const values: string[] = []

    if (category) {
      query += " WHERE category = ?"
      values.push(category)
    }

    query += " ORDER BY created_at DESC"

    const products = await executeQuery<Product[]>({ query, values })
    return NextResponse.json(products)
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

