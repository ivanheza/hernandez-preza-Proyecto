import {createContext, useContext, useEffect, useState} from "react"
import {addToCart, deleteProdByID, newCart} from "../api/cartApi"

import {getLocalStorage, setLocalStorage} from "../helpers/localStorage"

const CartContext = createContext([])

export const useCartContext = () => useContext(CartContext)

function CartProvider({children}) {
   const [cart, setCart] = useState(
      getLocalStorage("cart")
         ? getLocalStorage("cart")
         : {
              productos: [],
           }
   )
   //console.log(cart)
   console.log()

   ///
   const getCart = (id) => {
      //console.log(id)
      newCart(id).then((res) => {
         //console.log(res)
         const carrrito = res.data.carrito
         //console.log(carrrito)
         setCart(carrrito)
         setLocalStorage("cart", carrrito)
      })
   }

   const handleAdd = (producto) => {
      //console.log("desde handle", producto, cart._id)
      addToCart(cart._id, producto).then((res) => {
         //console.log(res)
         const carrrito = res.data.carrito
         setCart(carrrito)
         setLocalStorage("cart", carrrito)
      })
   }
   const borrarProducto = (id_prod) => {
      //console.log(cart._id)

      deleteProdByID(cart._id, id_prod).then((res) => {
         const carrrito = res.data.carrito
         setCart(carrrito)
         setLocalStorage("cart", carrrito)
      })
   }

   useEffect(() => {
      getLocalStorage("cart")
   }, [cart])

   return (
      <CartContext.Provider value={{getCart, borrarProducto, handleAdd, cart}}>
         {children}
      </CartContext.Provider>
   )
}

export default CartProvider
