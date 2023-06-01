import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    productCount: 0,
    products: [],
    // items: items,
    // setItems: setItems,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    updateProductCount: (state, { payload }) => {
      state.productCount = payload;
    },

    addProduct: (state, { payload }) => {
      const productIndex = state.products.findIndex(
        (el) => el.id === payload.id
      );
      console.log(productIndex);
      productIndex === -1
        ? state.products.push(payload)
        : state.products[productIndex].quantity++;
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
    fetchEnd: (state) => {
      state.loading = false;
    },
  },
});

export const {
  fetchStart,
  updateProductCount,
  addProduct,
  removeProduct,
  removeAllProduct,
  increaseProduct,
  decreaseProduct,
  fetchEnd,
} = productSlice.actions;
export default productSlice.reducer;
