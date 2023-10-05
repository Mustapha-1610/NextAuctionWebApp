import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apislice";
import { bidderReducer } from "./authslice";

const store = configureStore({
  reducer: {
    bidderData: bidderReducer,
    [apiSlice.reducerPath]: apiSlice.reducer, // add bidderApiSlice to the reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),

  devTools: true,
});

export default store;
