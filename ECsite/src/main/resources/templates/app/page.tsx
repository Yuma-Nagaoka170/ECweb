import Link from "next/link"
import { ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import ProductCard from "@/components/product-card"
import { getProducts, setupDatabase } from "@/lib/actions"

export default async function Home() {
  // Initialize database on first load
  await setupDatabase()

  // Fetch featured products
  const products = await getProducts()

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex items-center justify-between mb-8">
        <Link href="/" className="text-2xl font-bold">
          STYLE
        </Link>
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="font-medium hover:text-primary">
              Home
            </Link>
            <Link href="/products" className="font-medium hover:text-primary">
              Products
            </Link>
            <Link href="/about" className="font-medium hover:text-primary">
              About
            </Link>
            <Link href="/contact" className="font-medium hover:text-primary">
              Contact
            </Link>
          </nav>
          <Link href="/cart">
            <Button variant="outline" size="icon">
              <ShoppingBag className="h-5 w-5" />
              <span className="sr-only">Cart</span>
            </Button>
          </Link>
        </div>
      </header>

      <section className="mb-12">
        <div className="relative h-[500px] rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 z-10" />
          <img src="/placeholder.svg?height=500&width=1200" alt="Hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 z-20 flex flex-col justify-center px-8 md:px-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">New Season Arrivals</h1>
            <p className="text-xl text-white/90 mb-6 max-w-md">
              Discover the latest trends and elevate your style with our new collection.
            </p>
            <div>
              <Button asChild size="lg">
                <Link href="/products">Shop Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Link href="/products" className="text-primary hover:underline">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative h-[300px] rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img
            src="/placeholder.svg?height=300&width=600"
            alt="Women's Collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Women's Collection</h3>
            <Button asChild variant="secondary">
              <Link href="/products?category=women">Shop Women</Link>
            </Button>
          </div>
        </div>
        <div className="relative h-[300px] rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img
            src="/placeholder.svg?height=300&width=600"
            alt="Men's Collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Men's Collection</h3>
            <Button asChild variant="secondary">
              <Link href="/products?category=men">Shop Men</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <div className="bg-muted rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="mb-6 max-w-md mx-auto">Stay updated with the latest trends and exclusive offers.</p>
          <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </section>
    </div>
  )
}

