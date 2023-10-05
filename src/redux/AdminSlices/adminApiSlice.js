import { apiSlice } from "../apislice.js";

const USERS_URL = "/api/users";
const Admin_URL = "/api/admin";
const Bidder_URL = "/api/bidder";
const Seller_URL = "/api/seller";
const AuctionListing_URL = "/api/auctionlisting";
const AuctionRoom_URL = "/api/auctionroom";

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminlogin: builder.mutation({
      query: (data) => ({
        url: `${Admin_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    admingetbidders: builder.query({
      query: (data) => ({
        url: `${Admin_URL}/getBidders`,
        method: "GET",
      }),
    }),
    adminGetActiveSellers: builder.mutation({
      query: () => ({
        url: `${Admin_URL}/getActiveSellers`,
        method: "POST",
      }),
      refetchOnMountOrArgChange: true,
      cacheTime: 0,
    }),
    adminGetSellersPendingValidation: builder.mutation({
      query: (data) => ({
        url: `${Admin_URL}/getSellersPendingValidation`,
        method: "POST",
        body: data,
      }),
    }),
    admingValidateSeller: builder.mutation({
      query: (data) => ({
        url: `${Admin_URL}/validateSeller`,
        method: "POST",
        body: data,
      }),
    }),
    adminUnvalidateSeller: builder.mutation({
      query: (data) => ({
        url: `${Admin_URL}/unvalidateSeller`,
        method: "POST",
        body: data,
      }),
    }),
    admingetDisabledSellersAccounts: builder.mutation({
      query: () => ({
        url: `${Admin_URL}/getDisabledSellers`,
        method: "POST",
      }),
    }),
    adminActuallyValidatingTheSellerAcccount: builder.mutation({
      query: (data) => ({
        url: `${Admin_URL}/validateSellerAccount`,
        method: "POST",
        body: data,
      }),
    }),
    adminGetActiveBidders: builder.mutation({
      query: () => ({
        url: `${Admin_URL}/getActiveBidders`,
        method: "POST",
      }),
    }),
    adminGetDisabledBidders: builder.mutation({
      query: () => ({
        url: `${Admin_URL}/getDisabledBidders`,
        method: "POST",
      }),
    }),
    adminUnlockBidders: builder.mutation({
      query: (data) => ({
        url: `${Admin_URL}/unlockBidderAccount`,
        method: "POST",
        body: data,
      }),
    }),
    adminLockBidders: builder.mutation({
      query: (data) => ({
        url: `${Admin_URL}/lockBidderAccount`,
        method: "POST",
        body: data,
      }),
    }),
    adminStartRoom: builder.mutation({
      query: (data) => ({
        url: `${AuctionRoom_URL}/startRoom`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const {
  useAdminloginMutation,
  useAdmingetbiddersQuery,
  useAdminGetActiveSellersMutation,
  useAdminGetSellersPendingValidationMutation,
  useAdminUnvalidateSellerMutation,
  useAdmingValidateSellerMutation,
  useAdmingetDisabledSellersAccountsMutation,
  useAdminActuallyValidatingTheSellerAcccountMutation,
  useAdminGetActiveBiddersMutation,
  useAdminGetDisabledBiddersMutation,
  useAdminLockBiddersMutation,
  useAdminUnlockBiddersMutation,
  useAdminStartRoomMutation,
} = adminApiSlice;
