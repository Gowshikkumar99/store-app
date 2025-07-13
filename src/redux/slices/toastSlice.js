import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
  message: "",
  variant: "success",
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (state, action) => {
      state.show = true;
      state.message = action.payload.message;
      state.variant = action.payload.variant || "success";
    },
    hideToast: (state) => {
      state.show = false;
      state.message = "";
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;
