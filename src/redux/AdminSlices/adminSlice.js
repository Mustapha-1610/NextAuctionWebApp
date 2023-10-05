import { createSlice } from "@reduxjs/toolkit";

const adminInitialState = {
  adminInfo:
    typeof window !== "undefined" && localStorage.getItem("adminInfo")
      ? JSON.parse(localStorage.getItem("adminInfo"))
      : null,
};
const adminSlice = createSlice({
  name: "adminData",
  initialState: adminInitialState,
  reducers: {
    setAdminCredentials: (state, action) => {
      state.adminInfo = action.payload;
      localStorage.setItem("adminInfo", JSON.stringify(action.payload));
    },
    adminLogout: (state, action) => {
      state.adminInfo = null;
      localStorage.removeItem("adminInfo");
    },
  },
});

export const adminReducer = adminSlice.reducer;
