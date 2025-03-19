import { type NextRequest, NextResponse } from "next/server"
import type Stripe from "stripe"
import { headers } from "next/headers"
import stripe from "@/lib/stripe"
import { executeQuery } from "@/lib/db"
import { v4 as uuidv4 } from "uuid"

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = headers().get("stripe-signature") as string

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Stripe webhook secret is not set" }, { status: 500 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (error) {
    console.error("Webhook signature verification failed:", error)
    return NextResponse.json({ error: "Webhook signature verification failed" }, { status: 400 })
  }

  // Handle the event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session

    try {
      // Retrieve the session with line items
      const expandedSession = await stripe.checkout.sessions.retrieve(session.id, { expand: ["line_items"] })

      const lineItems = expandedSession.line_items?.data || []

      // Create order in database
      const orderId = uuidv4()
      await executeQuery({
        query: `
          INSERT INTO orders (
            id, 
            customer_email, 
            customer_name, 
            total_amount, 
            status, 
            stripe_payment_intent_id
          ) VALUES (?, ?, ?, ?, ?, ?)
        `,
        values: [
          orderId,
          session.customer_details?.email || "",
          session.customer_details?.name || "",
          session.amount_total ? session.amount_total / 100 : 0,
          "paid",
          session.payment_intent as string,
        ],
      })

      // Create order items
      for (const item of lineItems) {
        // Get product ID from metadata
        const productId = item.price?.metadata.product_id

        if (productId) {
          await executeQuery({
            query: `
              INSERT INTO order_items (
                id,
                order_id,
                product_id,
                quantity,
                price
              ) VALUES (?, ?, ?, ?, ?)
            `,
            values: [uuidv4(), orderId, productId, item.quantity || 1, item.amount_total ? item.amount_total / 100 : 0],
          })

          // Update inventory
          await executeQuery({
            query: `
              UPDATE products
              SET inventory = inventory - ?
              WHERE id = ?
            `,
            values: [item.quantity || 1, productId],
          })
        }
      }

      console.log(`Order ${orderId} created successfully`)
    } catch (error) {
      console.error("Error processing checkout session:", error)
      return NextResponse.json({ error: "Error processing checkout session" }, { status: 500 })
    }
  }

  return NextResponse.json({ received: true })
}

