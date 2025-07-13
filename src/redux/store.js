import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import formReducer from "./slices/formSlice";
import toastReducer from "./slices/toastSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    form: formReducer,
    toast: toastReducer,
  },
});
