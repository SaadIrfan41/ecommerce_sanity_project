import { db } from '@/db/db'
import { AddCartItem, CartTable } from '@/db/schema'
import { auth } from '@clerk/nextjs'

import { and, eq } from 'drizzle-orm'
import { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// export async function GET(request: NextRequest) {
//   const { userId } = auth()
//   console.log(userId)
//   if (!userId) {
//     return NextResponse.json({ message: 'User ID Not Valid' })
//   }
//   try {
//     const cart = await db
//       .select()
//       .from(CartTable)
//       .where(eq(CartTable.user_id, userId))
//     console.log(cart)

//     //  const cart_total = {
//     //    cart,
//     //    totalQuantity,
//     //    totalPrice,
//     //  }

//     return NextResponse.json(cart)
//     // return NextResponse.json({ cartItems: cart })
//   } catch (err) {
//     if (err instanceof Error) {
//       return NextResponse.json({ message: err.message })
//     } else {
//       console.log('Unexpected error', err)
//     }
//   }
// }

export async function POST(request: Request) {
  const { userId } = auth()
  if (!userId) {
    return NextResponse.json({ message: 'User ID Not Valid' })
  }
  const data = await request.json()
  console.log(data)
  const { productId, quantity, image, product_type, name, price } = data
  // console.log(await request.json())

  const newProduct: AddCartItem = {
    user_id: userId as string,
    product_id: productId,
    quantity,
    image,
    price,
    name,
    product_type,
  }
  try {
    const productExist = await db
      .select()
      .from(CartTable)
      .where(
        and(eq(CartTable.user_id, userId), eq(CartTable.product_id, productId))
      )
    if (productExist.length === 0) {
      //  const res = await db.insert(CartTable).values(newProduct).returning()
      //  const item = res[0]!
      //  console.log(item)
      await db.insert(CartTable).values(newProduct).returning()
      // await fetch(`http://localhost:3000/api/revalidate?tag=cartItems`)
      return NextResponse.json({ message: 'Product Added to Cart' })
    }
    await db
      .update(CartTable)
      .set({ quantity: productExist[0].quantity + quantity })
      .where(
        and(eq(CartTable.user_id, userId), eq(CartTable.product_id, productId))
      )
    // await fetch(`http://localhost:3000/api/revalidate?tag=cartItems`)

    return NextResponse.json({ message: 'Product Added to Cart' })
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message })
    } else {
      console.log('Unexpected error', err)
    }
  }
}

export async function PUT(request: Request) {
  console.log('PUT REQUEST ENTERED')
  const { userId } = auth()
  if (!userId) {
    return NextResponse.json({ message: 'User ID Not Valid' })
  }
  const { productId, action, quantity } = await request.json()

  // const updateProduct = {
  //   user_id: userId as string,
  //   product_id: productId,
  //   quantity,

  // }
  console.log(productId, action)
  try {
    const productExist = await db
      .select()
      .from(CartTable)
      .where(
        and(eq(CartTable.user_id, userId), eq(CartTable.product_id, productId))
      )

    if (productExist.length === 0) {
      //  const res = await db.insert(CartTable).values(newProduct).returning()
      //  const item = res[0]!
      //  console.log(item)
      // await db.insert(CartTable).values(newProduct).returning()

      return NextResponse.json({ message: 'Product Does not Exist' })
    }
    const updatedCart = await db
      .update(CartTable)
      .set({
        quantity:
          action === 'increment'
            ? quantity
              ? productExist[0].quantity + quantity
              : productExist[0].quantity + 1
            : productExist[0].quantity - 1,
      })
      .where(
        and(eq(CartTable.user_id, userId), eq(CartTable.product_id, productId))
      )
      .returning()
    console.log(updatedCart)
    // await fetch(`http://localhost:3000/api/revalidate?tag=cartItems`)

    return NextResponse.json({ message: 'Cart Updated' })
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message })
    } else {
      console.log('Unexpected error', err)
    }
  }
}

export async function DELETE(request: NextRequest) {
  console.log('Delete Request Entered')
  const { userId } = auth()
  console.log(userId)
  if (!userId) {
    return NextResponse.json({ message: 'User ID Not Valid' })
  }
  const url = request.nextUrl
  if (url.searchParams.has('id')) {
    const id = url.searchParams.get('id')
    if (id) {
      try {
        await db
          .delete(CartTable)
          .where(and(eq(CartTable.user_id, userId), eq(CartTable.id, id)))
          .returning()
        return NextResponse.json({ message: 'Item Deleted' })
      } catch (err) {
        if (err instanceof Error) {
          return NextResponse.json({ message: err.message })
        } else {
          console.log('Unexpected error', err)
        }
      }
    }
  } else {
    return new NextResponse('Cart ID Missing')
  }
  // console.log('DELETE REQUEST', id, userId)
}
