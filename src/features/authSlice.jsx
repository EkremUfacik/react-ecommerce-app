import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",

  initialState: {
    currentUser: null,
    currentUserId: null,
    loading: false,
    error: false,
    isAdmin: false,
    token: null,
    avatar: null,
    purse: null,
    address: null,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    loginSuccess: (state, { payload }) => {
      state.loading = false;
      state.currentUser = payload?.user;
      state.isAdmin = payload?.user?.is_superuser;
      state.token = payload?.key;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.currentUser = null;
      state.token = null;
      state.avatar = null;
      state.purse = null;
      state.address = null;
    },
    registerSuccess: (state, { payload }) => {
      state.loading = false;
      state.currentUser = payload;
      state.token = payload?.key;
      state.error = false;
    },
    profileSuccess: (state, { payload }) => {
      state.loading = false;
      state.avatar = payload.avatar;
      state.purse = payload.purse;
      state.error = false;
    },

    getAddressSuccess: (state, { payload }) => {
      state.loading = false;
      state.address = payload;
      state.error = false;
    },

    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  fetchStart,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
  fetchFail,
  profileSuccess,
  getAddressSuccess,
} = authSlice.actions;
export default authSlice.reducer;
