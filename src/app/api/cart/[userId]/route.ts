import { db } from '@/db/db'
import { CartTable } from '@/db/schema'
import { and, eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export async function GET(
  request: NextRequest,
  { params: { userId } }: { params: { userId: string } }
) {
  console.log('API ROUTE ENTERED')
  if (!userId) {
    return NextResponse.json({ message: 'User ID Not Valid' })
  }
  try {
    const cart = await db
      .select()
      .from(CartTable)
      .where(eq(CartTable.user_id, userId))
    // console.log(cart)
    let totalQuantity = 0
    let totalPrice = 0
    cart.forEach((item: any) => {
      totalQuantity += item.quantity
      totalPrice += parseInt(item.price) * item.quantity
    })
    const cart_total = {
      cart,
      totalQuantity,
      totalPrice,
    }

    return NextResponse.json(cart_total)
    // return NextResponse.json({ cartItems: cart })
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message })
    } else {
      console.log('Unexpected error', err)
    }
  }
}

export async function PUT(
  request: NextRequest,
  { params: { userId } }: { params: { userId: string } }
) {
  console.log('DELETE API ROUTE ENTERED')
  if (!userId) {
    return NextResponse.json({ message: 'User ID Not Valid' })
  }
  const { id } = await request.json()

  try {
    await db
      .delete(CartTable)
      .where(and(eq(CartTable.user_id, userId), eq(CartTable.id, id)))
      .returning()

    //  const cart_total = {
    //    cart,
    //    totalQuantity,
    //    totalPrice,
    //  }

    return NextResponse.json({ message: 'Item Deleted' })
    // return NextResponse.json({ cartItems: cart })
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message })
    } else {
      console.log('Unexpected error', err)
    }
  }
}

export async function DELETE(
  request: NextRequest,
  { params: { userId } }: { params: { userId: string } }
) {
  console.log('DELETE API ROUTE ENTERED')
  if (!userId) {
    return NextResponse.json({ message: 'User ID Not Valid' })
  }

  try {
    await db.delete(CartTable).where(eq(CartTable.user_id, userId)).returning()

    //  const cart_total = {
    //    cart,
    //    totalQuantity,
    //    totalPrice,
    //  }

    return NextResponse.json({ message: 'Cart Cleared' })
    // return NextResponse.json({ cartItems: cart })
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message })
    } else {
      console.log('Unexpected error', err)
    }
  }
}
