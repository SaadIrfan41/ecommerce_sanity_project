import React, { Suspense } from 'react'

import { auth } from '@clerk/nextjs'
import Cart from '@/components/Cart'

// const getCartItems = async () => {
//   // const res = await fetch('http://localhost:3000/api/cart', {
//   //   cache: 'no-store',
//   // })
//   // try {
//   //   const res = await fetch('http://localhost:3000/api/cart', {
//   //     cache: 'no-store',
//   //   })

//   //   const data = await res.json()
//   //   console.log(data)
//   //   return data
//   // } catch (error) {
//   //   console.log(error)
//   // }
//   const { userId } = auth()
//   const res = await fetch(`http://localhost:3000/api/cart/${userId}`)
//   const data = await res.json()

//   return data
//   // let totalQuantity = 0
//   // let totalPrice = 0

//   // if (!userId) {
//   //   return
//   // }
//   // try {
//   //   const cart = await db
//   //     .select()
//   //     .from(CartTable)
//   //     .where(eq(CartTable.user_id, userId))
//   //     .orderBy(asc(CartTable.created_at))
//   //   // console.log(cart)

//   //   cart.forEach((item: any) => {
//   //     totalQuantity += item.quantity
//   //     totalPrice += parseInt(item.price) * item.quantity
//   //   })
//   //   const cart_total = {
//   //     cart,
//   //     totalQuantity,
//   //     totalPrice,
//   //   }
//   //   return cart_total
//   // } catch (err) {
//   //   if (err instanceof Error) {
//   //     console.log({ message: err.message })
//   //   } else {
//   //     console.log('Unexpected error', err)
//   //   }
//   // }
// }
const CartPage = () => {
  const { userId } = auth()

  return (
    <section className='lg:my-16 2xl:mx-32 '>
      {/* <Suspense fallback={'Loading...'}> */}
      {
        //@ts-ignore
        // <Cart items={items} />
        <Cart userId={userId} />
      }
      {/* </Suspense> */}
    </section>
  )
}

export default CartPage
