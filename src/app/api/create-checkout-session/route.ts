import Stripe from 'stripe'
import { NextResponse, NextRequest } from 'next/server'
import { auth } from '@clerk/nextjs'
import { Product } from '@/store/useProductStore'

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string, {
  apiVersion: '2022-11-15',
})

export async function POST(request: NextRequest) {
  // console.log(await request.json())
  const body = await request.json()
  console.log(body)
  const { userId } = auth()
  try {
    if (!userId)
      return NextResponse.json(
        { message: 'UNAUTHORIZED USER' },
        { status: 401 }
      )
    console.log(userId)
    const items = body.map((item: Product) => {
      //   const newImage = item.image
      //     .replace('image-', 'https://cdn.sanity.io/images/i77se9ww/production/')
      //     .replace('-webp', '.webp')
      return {
        price_data: {
          currency: 'usd',

          product_data: {
            name: item.name,
            images: [item.image],
          },
          unit_amount: Number(item.price) * 100,
        },
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
        },
        quantity: item.quantity,
      }
    })
    // const stringifiedProducts = body.map((item: Product) =>
    //   JSON.stringify(item).toString()
    // )
    // const joinedString = stringifiedProducts.join(',')
    const customer = await stripe.customers.create({
      metadata: {
        userId: userId,
        // cart: joinedString,
      },
    })
    // console.log(items)

    const StripeSession = await stripe.checkout.sessions.create({
      line_items: items,
      customer: customer.id,
      submit_type: 'pay',
      mode: 'payment',
      payment_method_types: ['card'],

      billing_address_collection: 'auto',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,

      //    automatic_tax: { enabled: true },
    })
    return NextResponse.json({ id: StripeSession.id }, { status: 200 })
  } catch (err: any) {
    console.log(err.message)
    return NextResponse.json({ message: err.message }, { status: 400 })
  }
}
