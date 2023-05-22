import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    productCount: 0,
    products: [],
    // items: items,
    // setItems: setItems,
  },
  reducers: {
    updateProductCount: (state, { payload }) => {
      state.productCount = payload;
    },

    addProduct: (state, { payload }) => {
      state.products.push(payload);
    },
    removeProduct: (state, { payload }) => {
      state.products = state.products.filter(
        (product) => product.id !== payload
      );
    },
    increaseProduct: (state, { payload }) => {
      state.products.forEach((prod) => prod.id === payload && prod.quantity++);
    },
    decreaseProduct: (state, { payload }) => {
      state.products.forEach((prod) => prod.id === payload && prod.quantity--);
    },
    removeAllProduct: (state) => {
      state.products = [];
    },
  },
});

export const {
  updateProductCount,
  addProduct,
  removeProduct,
  removeAllProduct,
  increaseProduct,
  decreaseProduct,
} = productSlice.actions;
export default productSlice.reducer;
