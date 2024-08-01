import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ProductModel } from '../../../models/productModel'

export interface CartState {
  quantity: number,
  product: ProductModel
}

const initialState : {
  value: CartState[]
} = {
  value: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCart: (state, action: PayloadAction<CartState>) => {
      const cart = state.value.find((cart) => cart.product.id === action.payload.product.id);
      if (cart){
        state.value = state.value.map((cart:CartState) => {
          if (cart.product.id === action.payload.product.id){
            cart.quantity = action.payload.quantity
          }
          return cart;
        });
      }else{
        state.value = [...state.value, action.payload];
      }
    },

    removeProduct: (state, action: PayloadAction<ProductModel>) => {
      const cart = state.value.find((cart) => cart.product.id === action.payload.id);
      if (cart){
        state.value = state.value.filter((cart:CartState) => cart.product.id != action.payload.id).map(_ => _);
      }
    },

    updateProduct: (state, action: PayloadAction<CartState>) => {
      const cart = state.value.find((cart) => cart.product.id === action.payload.product.id);
      if (cart){
        state.value = state.value.map((cart:CartState) => {
          if (cart.product.id === action.payload.product.id){
            cart.quantity = action.payload.quantity
          }
          return cart;
        });
      }
    },

  },
})

export const { addCart, removeProduct, updateProduct } = cartSlice.actions

export default cartSlice.reducer