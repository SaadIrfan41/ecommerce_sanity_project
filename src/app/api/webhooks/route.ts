import Stripe from 'stripe'
import { NextRequest, NextResponse } from 'next/server'

const endpointSecret = process.env.NEXT_PUBLIC_STRIPE_ENDPOINT_SECRETE as string
import { headers } from 'next/headers'
import { db } from '@/db/db'
import { CartTable, CreateOrder, Order, OrderTable } from '@/db/schema'
import { eq } from 'drizzle-orm'

export const dynamic = 'auto'

export async function POST(req: NextRequest, res: NextResponse) {
  const headersList = headers()

  console.log('STRIPE ENDPOINT SECRET', endpointSecret)
  console.log('STRIPE SECRET', process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)

  try {
    const requestBuffer = await req.text()
    const sig = headersList.get('stripe-signature')
    const stripe = new Stripe(
      process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string,
      {
        apiVersion: '2022-11-15',
      }
    )

    let event

    try {
      if (!sig || !endpointSecret) {
        return new Response(`Webhook Signature Or Endpoint Secret is Missing`, {
          status: 400,
        })
      }
      // Use the Stripe SDK and request info to verify this Webhook request actually came from Stripe
      event = stripe.webhooks.constructEvent(
        requestBuffer.toString(), // Stringify the request for the Stripe library
        sig,
        endpointSecret
      )
    } catch (err: any) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message)
      return new Response(`Webhook Signature Or Endpoint Secret is Missing`, {
        status: 400,
      })
    }
    // console.log(event.data.object)
    // Handle the event
    switch (event.type) {
      // Handle successful subscription creation
      case 'checkout.session.completed': {
        const session = event.data.object
        //@ts-ignore
        const customerData = await stripe.customers.retrieve(session.customer)
        //@ts-ignore
        // const JsonProducts = JSON.parse(customerData.metadata.cart)
        // const products = JSON.parse(`[${JsonProducts}]`)

        // const dataArray = JsonProducts.split(',').map((item: any) => {
        //   const cleanedItem = item.replace(/\[|\]/g, '') // Remove square brackets
        //   return JSON.parse(cleanedItem)
        // })
        //@ts-ignore
        // const products = JSON.parse(customerData.metadata.cart).map(
        //   (item: any) => JSON.parse(item)
        // )
        //@ts-ignore
        const userId = customerData.metadata.userId
        const cart = await db
          .select()
          .from(CartTable)
          .where(eq(CartTable.user_id, userId))
        let totalQuantity = 0
        let totalPrice = 0
        cart.forEach((item: any) => {
          totalQuantity += item.quantity
          totalPrice += parseInt(item.price) * item.quantity
        })
        // const cart_total = {
        //   cart,
        //   totalQuantity,
        //   totalPrice,
        // }
        const order: CreateOrder = {
          user_id: userId,
          products: cart,
          total_price: totalPrice.toString(),
          total_quantity: totalQuantity.toString(),
        }
        const newOrder = await db.insert(OrderTable).values(order).returning()
        console.log('New Order Created', newOrder)
        // console.log('ORGINAL PRODUCTS', products)
        // console.log('JSON PRODUCTS', products)
        await db
          .delete(CartTable)
          .where(eq(CartTable.user_id, userId))
          .returning()
        //    const items = session.line_items.map((item) => ({
        //      name: item.description,
        //      price: item.amount_total,
        //      quantity: item.quantity,
        //    }))

        break
      }

      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`)
    }

    // Return a 200 response to acknowledge receipt of the event
    return new Response('payment confirmation route received', {
      status: 200,
    })
  } catch (error) {
    console.log(error)
    return new Response(`Webhook error: ${error}`, {
      status: 400,
    })
  }
}
