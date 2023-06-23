import { toast } from 'react-hot-toast'
import { create } from 'zustand'
import { urlForImage } from '../../sanity/lib/image'

interface Product {
  id: string
  user_id: string
  product_id: string
  quantity: number
  image: string
  name: string
  price: number
  product_type: string
  created_at: string
  updated_at: string
}

interface State {
  products: Product[]
  isLoading: boolean
  updatingCart: boolean
  error: any
  cart: Product[]
  totalItems: number
  totalPrice: number
}

interface Actions {
  addToCart: (
    Item: Product,
    userId: string,
    action: 'increment' | 'decrement',
    quantity: number
  ) => Promise<void>
  increment_decrement_quantity: (
    Item: Product,
    userId: string,
    action: 'increment' | 'decrement'
  ) => Promise<void>
  fetchData: (userId: string) => Promise<void>
  deleteSingleProductFromCart: (Item: Product, userId: string) => Promise<void>
  clearCart: () => void
}

const INITIAL_STATE: State = {
  products: [],
  isLoading: false,
  updatingCart: false,
  error: null,
  cart: [],
  totalItems: 0,
  totalPrice: 0,
}

export const useCartStore = create<State & Actions>((set, get) => ({
  products: INITIAL_STATE.products,
  isLoading: INITIAL_STATE.isLoading,
  updatingCart: INITIAL_STATE.updatingCart,
  error: INITIAL_STATE.error,
  cart: INITIAL_STATE.cart,
  totalItems: INITIAL_STATE.totalItems,
  totalPrice: INITIAL_STATE.totalPrice,
  fetchData: async (userId) => {
    try {
      set({ isLoading: true, error: null })
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/cart/${userId}`
      )
      const data = await res.json()
      console.log(data)
      set({
        products: data.cart,
        cart: data.cart,
        isLoading: false,
        totalItems: data.totalQuantity,
        totalPrice: data.totalPrice,
      })
    } catch (error) {
      set({ error, isLoading: false })
    }
  },
  addToCart: async (
    product: Product,
    userId: string,
    action: 'increment' | 'decrement',
    quantity: number
  ) => {
    if (!userId) {
      return set((state) => ({
        ...state,
        error: 'User ID Not Found',
      }))
    }
    const cart = get().cart
    const cartItem = cart.find((item) => item.product_id === product.product_id)
    console.log(cart)
    try {
      if (cartItem) {
        console.log('Item Exisit in cart')
        set({ updatingCart: true, error: null })
        const res = await fetch('/api/cart', {
          method: 'PUT',
          body: JSON.stringify({
            productId: product.product_id,
            action,
            quantity,
          }),
        })
        const data = await res.json()
        if (!res.ok) {
          return set({ updatingCart: false, error: data?.message })
        }

        toast.success(data.message)
        // console.log(await res.json())
        const updatedCart = cart.map((item) =>
          item.product_id === product.product_id
            ? {
                ...item,
                quantity: Number(item.quantity) + Number(quantity),
              }
            : item
        )
        console.log('Updated Quantity ONLY', updatedCart)
        console.log('Quantity', quantity)
        return set((state) => ({
          updatingCart: false,
          error: null,
          cart: updatedCart,
          totalItems: state.totalItems + Number(quantity),
          totalPrice: state.totalPrice + Number(product.price),
        }))
      } else {
        console.log('Item Does Not Exisit in cart')
        set({ updatingCart: true, error: null })

        const res = await fetch('/api/cart', {
          method: 'POST',
          body: JSON.stringify({
            productId: product.product_id,
            quantity: quantity,
            //@ts-ignore
            image: urlForImage(product.image[0])?.url(),
            product_type: product.product_type,
            price: product.price,
            name: product.name,
          }),
        })
        const data = await res.json()
        if (!res.ok) {
          return set({ updatingCart: false, error: data?.message })
        }

        toast.success(data.message)
        const updatedCart = [...cart, { ...product, quantity: quantity }]

        set((state) => ({
          updatingCart: false,
          error: null,
          cart: updatedCart,
          totalItems: state.totalItems + quantity,
          totalPrice: state.totalPrice + Number(product.price),
        }))
      }
    } catch (error) {
      set({ error, updatingCart: false })
    }
  },
  increment_decrement_quantity: async (
    product: Product,
    userId: string,
    action: 'increment' | 'decrement'
  ) => {
    if (!userId) {
      return set((state) => ({
        ...state,
        error: 'User ID Not Found',
      }))
    }
    const cart = get().cart
    const cartItem = cart.find((item) => item.product_id === product.product_id)

    if (cartItem) {
      set({ updatingCart: true, error: null })
      const res = await fetch('/api/cart', {
        method: 'PUT',
        body: JSON.stringify({
          productId: product.product_id,
          action,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        return set({ updatingCart: false, error: data?.message })
      }

      toast.success(data.message)
      // console.log(await res.json())
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity:
                action === 'increment'
                  ? (item.quantity as number) + 1
                  : (item.quantity as number) - 1,
            }
          : item
      )

      if (action === 'increment') {
        return set((state) => ({
          updatingCart: false,
          error: null,
          cart: updatedCart,
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + Number(product.price),
        }))
      }

      return set((state) => ({
        updatingCart: false,
        error: null,
        cart: updatedCart,
        totalItems: state.totalItems - 1,
        totalPrice: state.totalPrice - Number(product.price),
      }))
    } else {
      console.log('Item Does Not Exisit in cart')
      toast.error('Item Does Not Exisit')
    }
  },
  deleteSingleProductFromCart: async (product: Product, userId: string) => {
    try {
      set({ updatingCart: true, error: null })
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/cart?id=${product.id}`,
        {
          method: 'DELETE',
        }
      )
      const data = await res.json()
      if (!res.ok) {
        return set({ updatingCart: false, error: data?.message })
      }

      toast.success(data.message)
      set((state) => ({
        cart: state.cart.filter(
          (item) => item.product_id !== product.product_id
        ),
        totalItems: state.totalItems - product.quantity,
        totalPrice: state.totalPrice - Number(product.price * product.quantity),
        updatingCart: false,
        error: null,
      }))
    } catch (error) {
      console.log(error)
      set({ error, updatingCart: false })
    }
  },
  clearCart: async () => {
    set((state) => ({
      cart: [],
      totalItems: 0,
      totalPrice: 0,
      updatingCart: false,
      error: null,
    }))
  },
}))
