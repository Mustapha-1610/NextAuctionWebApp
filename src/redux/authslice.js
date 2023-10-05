import { createSlice } from "@reduxjs/toolkit";

//
const biddersInitialState = {
  bidderInfo:
    typeof window !== "undefined" && localStorage.getItem("bidderInfo")
      ? JSON.parse(localStorage.getItem("bidderInfo"))
      : null,
};

const bidderSlice = createSlice({
  name: "bidderData",
  initialState: biddersInitialState,
  reducers: {
    setBidderCredentials: (state, action) => {
      state.bidderInfo = action.payload;
      localStorage.setItem("bidderInfo", JSON.stringify(action.payload));
    },
    bidderLogout: (state, action) => {
      state.bidderInfo = null;
      localStorage.removeItem("bidderInfo");
    },
    setBidderSocket: (state, action) => {
      state.bidderSocket = action.payload;
    },
  },
});

export const { setBidderCredentials, bidderLogout, setBidderSocket } =
  bidderSlice.actions;

export const bidderReducer = bidderSlice.reducer;
