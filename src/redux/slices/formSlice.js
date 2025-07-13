import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProductService from "../../api/ProductService";

export const submitForm = createAsyncThunk(
  "form/submitForm",
  async (form, thunkAPI) => {
    try {
      const { title, price, category, description, image } = form;
      const response = await ProductService.add({
        title,
        price: Number(price),
        category,
        description,
        image,
      });
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const updateForm = createAsyncThunk(
  "products/updateProducts",
  async (product, thunkAPI) => {
    try {
      const { title, price, category, description, image } = product;
      const response = await ProductService.update(product.id, {
        title,
        price: Number(price),
        category,
        description,
        image,
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const formSlice = createSlice({
  name: "form",
  initialState: {
    title: "",
    price: "",
    category: "",
    description: "",
    image: "",
    loading: false,
    error: null,
  },
  reducers: {
    setForm(state, action) {
      return { ...state, ...action.payload };
    },
    resetForm() {
      return {
        title: "",
        price: "",
        category: "",
        description: "",
        image: "",
        loading: false,
        error: null,
      };
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(submitForm.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitForm.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(submitForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(updateForm.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateForm.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      }),
});

export const { setForm, resetForm } = formSlice.actions;
export default formSlice.reducer;
