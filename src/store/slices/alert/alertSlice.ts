import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface MessageState {
  message: string,
  show: boolean
}

const initialState: MessageState = {
  message: '',
  show: false
}

export const alertSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    showAlert: (state, payload: PayloadAction<{message: string}>) => {
      state.message = payload.payload.message;
      state.show = true;
    },
    hideAlert: (state) => {
      state.message = '';
      state.show = false;
    }
  },
})

export const { showAlert, hideAlert } = alertSlice.actions

export default alertSlice.reducer