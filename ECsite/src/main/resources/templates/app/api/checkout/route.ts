"use server"

import { executeQuery, initializeDatabase } from "./db"
import type { Product } from "./types"
import { v4 as uuidv4 } from "uuid"

// Initialize the database
export async function setupDatabase() {
  await initializeDatabase()

  // Check if we have products, if not, seed the database
  const products = await executeQuery<Product[]>({
    query: "SELECT * FROM products LIMIT 1",
  })

  if (products.length === 0) {
    await seedProducts()
  }

  return { success: true }
}

// Seed products
async function seedProducts() {
  const productsData = [
    {
      id: uuidv4(),
      name: "Classic White T-Shirt",
      description: "A timeless white t-shirt made from premium cotton for everyday comfort and style.",
      price: 29.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "men",
      inventory: 100,
    },
    {
      id: uuidv4(),
      name: "Slim Fit Jeans",
      description: "Modern slim fit jeans with a comfortable stretch fabric that moves with you.",
      price: 59.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "men",
      inventory: 75,
    },
    {
      id: uuidv4(),
      name: "Floral Summer Dress",
      description: "A lightweight floral dress perfect for warm summer days and special occasions.",
      price: 79.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "women",
      inventory: 50,
    },
    {
      id: uuidv4(),
      name: "Leather Jacket",
      description: "A classic leather jacket that adds an edge to any outfit. Durable and stylish.",
      price: 199.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "men",
      inventory: 30,
    },
    {
      id: uuidv4(),
      name: "Knit Sweater",
      description: "A cozy knit sweater for those chilly days. Made from soft, high-quality yarn.",
      price: 69.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "women",
      inventory: 60,
    },
    {
      id: uuidv4(),
      name: "Casual Sneakers",
      description: "Comfortable casual sneakers that go with everything in your wardrobe.",
      price: 89.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "accessories",
      inventory: 45,
    },
    {
      id: uuidv4(),
      name: "Silk Blouse",
      description: "An elegant silk blouse that transitions perfectly from office to evening wear.",
      price: 119.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "women",
      inventory: 40,
    },
    {
      id: uuidv4(),
      name: "Wool Coat",
      description: "A sophisticated wool coat to keep you warm and stylish during colder months.",
      price: 249.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "women",
      inventory: 25,
    },
  ]

  for (const product of productsData) {
    await executeQuery({
      query: `
        INSERT INTO products (
          id, name, description, price, image, category, inventory
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      values: [
        product.id,
        product.name,
        product.description,
        product.price,
        product.image,
        product.category,
        product.inventory,
      ],
    })
  }

  console.log("Products seeded successfully")
}

// Get all products
export async function getProducts(category?: string) {
  try {
    let query = "SELECT * FROM products"
    const values: string[] = []

    if (category) {
      query += " WHERE category = ?"
      values.push(category)
    }

    query += " ORDER BY created_at DESC"

    const products = await executeQuery<Product[]>({ query, values })
    return products
  } catch (error) {
    console.error("Error fetching products:", error)
    throw new Error("Failed to fetch products")
  }
}

// Get product by ID
export async function getProductById(id: string) {
  try {
    const products = await executeQuery<Product[]>({
      query: "SELECT * FROM products WHERE id = ?",
      values: [id],
    })

    if (!products || products.length === 0) {
      return null
    }

    return products[0]
  } catch (error) {
    console.error("Error fetching product:", error)
    throw new Error("Failed to fetch product")
  }
}

// Create checkout session
export async function createCheckoutSession(items: { productId: string; quantity: number }[]) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items,
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart`,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to create checkout session")
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error creating checkout session:", error)
    throw new Error("Failed to create checkout session")
  }
}

