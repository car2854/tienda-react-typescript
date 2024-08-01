/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const fakeStoreApi : any = createApi({
  reducerPath: 'fakeStore',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://fakestoreapi.com'
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({category}) => {
        if (category != 'all') return `/products/category/${category}`
        return '/products';
      },
    }),
    getProduct: builder.query({
      query: ({productId}) => `https://fakestoreapi.com/products/${productId}`
    }),
    getCategories: builder.query({
      query: () => '/products/categories'
    }),
  })
});

export const { useGetProductsQuery, useGetCategoriesQuery, useGetProductQuery } = fakeStoreApi;