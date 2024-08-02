import { Dispatch } from "@reduxjs/toolkit";
import { hideAlert, showAlert } from "./alertSlice";

export const showAlertThunk = (message: string, time = 1500) => async (dispatch: Dispatch) => {
    dispatch(showAlert({message: message}));
    setTimeout(() => {
      dispatch(hideAlert())
    },
  time);
}