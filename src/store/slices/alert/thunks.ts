import { Dispatch } from "@reduxjs/toolkit";
import { hideAlert, showAlert } from "./alertSlice";

export const showAlertThunk = (message: string) => async (dispatch: Dispatch) => {
    dispatch(showAlert({message: message}));
    setTimeout(() => {
      dispatch(hideAlert())
    },
  1500);
}