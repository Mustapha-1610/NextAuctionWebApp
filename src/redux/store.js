import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apislice";
import { bidderReducer } from "./BidderSlices/bidderSlice";
import { adminReducer } from "./AdminSlices/adminSlice";
import { sellerReducer } from "./SellerSclies/sellerSlice";
const store = configureStore({
  reducer: {
    bidderData: bidderReducer,
    adminData: adminReducer,
    sellerData: sellerReducer,
    [apiSlice.reducerPath]: apiSlice.reducer, // add bidderApiSlice to the reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),

  devTools: true,
});

export default store;
