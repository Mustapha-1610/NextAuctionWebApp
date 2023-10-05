import { createSlice } from "@reduxjs/toolkit";

const sellerInitialState = {
  sellerInfo:
    typeof window !== "undefined" && localStorage.getItem("sellerInfo")
      ? JSON.parse(localStorage.getItem("sellerInfo"))
      : null,
};

const sellerSlice = createSlice({
  name: "sellerData",
  initialState: sellerInitialState,
  reducers: {
    setSellerCredentials: (state, action) => {
      state.sellerInfo = action.payload;
      localStorage.setItem("sellerInfo", action.payload);
    },
    sellerLogout: (state, action) => {
      state.sellerInfo = null;
      localStorage.removeItem("sellerInfo");
    },
  },
});

export const sellerReducer = sellerSlice.reducer;
