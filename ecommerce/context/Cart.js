import { useReducer, createContext } from 'react'

// iniciamos un estado para el carrito de compras
  const initialState = {
    cart: [],
  }

  const cartReducer = (state, action) => {
      // AGREGAR AL CARRITO: "ADD_TO_CART"
      // REMOVER DEL CARRITO: "REMOVE_FROM_CART"
      switch(action.type){
        case "ADD_TO_CART":
            return {...state, cart:[...state.cart, action.payload]}
            case "REMOVE_FROM_CART":
                return {...state, 
                    cart: state.cart.filter(item => item._id !== action.payload)
                }
                default:
                    return state
      }
  }

  // creamos el contexto 
   const CartContext = createContext() // crear el contexto

   // creamos el proveedor del contexto podemos usar 
   // el componente Context.Provider 

   const CartProvider = ({children}) =>{
     // datos a compartir con otros componentes 
     const [state, dispatch] = useReducer(cartReducer, initialState)
     const addToCart = (item) =>{
        dispatch({type: "ADD_TO_CART", payload: item})
     }

     const removeFromCart = (item) => {
        dispatch({type: "REMOVE_FROM_CART", payload: item._id})
     }

     return (
        <CartContext.Provider
        // value paso los datos que quiero compartir con otros componentes
         value={{...state, addToCart, removeFromCart}}>
         {/* componentes hijos */}
         {children}
        </CartContext.Provider>
     )

   }

   export { CartContext, CartProvider}