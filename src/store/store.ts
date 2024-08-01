import { configureStore } from '@reduxjs/toolkit'
import { fakeStoreApi } from './api'
import { cartSlice } from './slices/cart'
import { alertSlice } from './slices/alert'


export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    alert: alertSlice.reducer,
    [fakeStoreApi.reducerPath]: fakeStoreApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(fakeStoreApi.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch