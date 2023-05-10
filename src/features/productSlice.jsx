import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    productCount: 0,
    // items: items,
    // setItems: setItems,
  },
  reducers: {
    updateProductCount: (state, { payload }) => {
      state.productCount = payload;
    },
  },
});

export const { updateProductCount } = productSlice.actions;
export default productSlice.reducer;
