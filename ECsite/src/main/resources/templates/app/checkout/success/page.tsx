"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/lib/hooks/use-cart"
import { createCheckoutSession } from "@/lib/actions"
import type { Product } from "@/lib/types"

export default function CartPage() {
  const { items, updateQuantity, removeItem } = useCart()
  const [products, setProducts] = useState<(Product & { quantity: number })[]>([])
  const [loading, setLoading] = useState(true)
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const router = useRouter()

  // Fetch product details for cart items
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const productPromises = items.map((item) =>
          fetch(`/api/products/${item.productId}`)
            .then((res) => res.json())
            .then((product) => ({ ...product, quantity: item.quantity })),
        )

        const fetchedProducts = await Promise.all(productPromises)
        setProducts(fetchedProducts)
      } catch (error) {
        console.error("Error fetching cart products:", error)
      } finally {
        setLoading(false)
      }
    }

    if (items.length > 0) {
      fetchProducts()
    } else {
      setProducts([])
      setLoading(false)
    }
  }, [items])

  // Calculate totals
  const subtotal = products.reduce((sum, item) => sum + (item?.price || 0) * (item?.quantity || 0), 0)
  const shipping = subtotal > 0 ? 10 : 0
  const total = subtotal + shipping

  // Handle checkout
  const handleCheckout = async () => {
    try {
      setCheckoutLoading(true)

      const checkoutItems = items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      }))

      const { url } = await createCheckoutSession(checkoutItems)

      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error("Checkout error:", error)
      alert("Checkout failed. Please try again.")
    } finally {
      setCheckoutLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        <div>Loading cart...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-medium mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Button asChild>
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="rounded-lg border">
              <div className="p-4 bg-muted/50">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>
              </div>

              {products.map(
                (item) =>
                  item && (
                    <div key={item.id} className="p-4 border-t">
                      <div className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-6">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <h3 className="font-medium">{item.name}</h3>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="text-sm text-red-500 flex items-center gap-1 mt-1"
                              >
                                <Trash2 className="h-3 w-3" />
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-2 text-center">${item.price.toFixed(2)}</div>
                        <div className="col-span-2 text-center">
                          <div className="flex items-center justify-center">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              -
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              +
                            </Button>
                          </div>
                        </div>
                        <div className="col-span-2 text-right font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ),
              )}
            </div>
          </div>

          <div>
            <div className="rounded-lg border p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>

                <div className="pt-4">
                  <div className="flex gap-2">
                    <Input placeholder="Discount code" />
                    <Button variant="outline">Apply</Button>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <Button className="w-full" size="lg" onClick={handleCheckout} disabled={checkoutLoading}>
                  {checkoutLoading ? "Processing..." : "Checkout with Stripe"}
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  <Link href="/products" className="hover:underline">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

