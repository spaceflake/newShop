import React, { createContext, useContext, useReducer, useEffect } from 'react'
import useLocalStorage from '../Hooks/useLocalStorage'
import { cartReducer, CartActions, CartType, initialState } from './Reducers'

type Context = {
  cart: CartType[]
  dispatch: React.Dispatch<CartActions>
  total: 0 | number | unknown
}

function init(initialState: any) {
  initialState = localStorage.getItem('cart')
  return initialState
    ? JSON.parse(initialState)
    : ([] as unknown | CartType | undefined)
}

export const CartContext = createContext<Context>({} as Context)

export const CartProvider: React.FC = ({ children }) => {
  const [total, setTotal] = useLocalStorage('cartSum', 0)

  const [cart, dispatch] = useReducer<React.Reducer<CartType[], CartActions>>(
    cartReducer,
    initialState,
    init as any
  )

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
    setTotal(
      cart.reduce(
        (acc: number, current: CartType) => acc + current.price * current.qty,
        0
      )
    )
  }, [cart, setTotal])

  return (
    <CartContext.Provider value={{ cart, dispatch, total }}>
      {children}
    </CartContext.Provider>
  )
}
export default CartProvider
// useCart hook
export const useCart = () => useContext(CartContext)
