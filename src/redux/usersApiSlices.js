import { apiSlice } from "./apislice";
const Bidder_URL = "/api/bidder";

export const bidderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUpdatedBidderInfo: builder.mutation({
      query: () => ({
        url: `${Bidder_URL}/getProfile`,
        method: "POST",
      }),
    }),
    bidderlogin: builder.mutation({
      query: (data) => ({
        url: `${Bidder_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    biddersignup: builder.mutation({
      query: (data) => ({
        url: `${Bidder_URL}/createBidder`,
        method: "POST",
        body: data,
      }),
    }),
    bidderActivation: builder.mutation({
      query: (data) => ({
        url: `${Bidder_URL}/activate`,
        method: "PUT",
        body: data,
      }),
    }),
    sendBidderActivationMail: builder.mutation({
      query: (data) => ({
        url: `${Bidder_URL}/sendConfirmationMail`,
        method: "POST",
        body: data,
      }),
    }),
    editBidderInformations: builder.mutation({
      query: (data) => ({
        url: `${Bidder_URL}/editInformations`,
        method: "POST",
        body: data,
      }),
    }),
    getLatestAuctions: builder.query({
      query: (data) => ({
        url: `${AuctionListing_URL}/getLatestAuctions`,
      }),
    }),
    getAuction: builder.mutation({
      query: (data) => ({
        url: `${AuctionListing_URL}/getAuction`,
        method: "POST",
        body: data,
      }),
    }),
    AuctionParticipation: builder.mutation({
      query: (data) => ({
        url: `${Bidder_URL}/participate`,
        method: "POST",
        body: data,
      }),
    }),
    AuctionUnparticipation: builder.mutation({
      query: (data) => ({
        url: `${Bidder_URL}/unparticipate`,
        method: "POST",
        body: data,
      }),
    }),
    getAllOnoingAuctions: builder.query({
      query: () => ({
        url: `${AuctionListing_URL}/getOngoingAuctions`,
        method: "GET",
      }),
    }),
    getAllCompletedAuctions: builder.query({
      query: () => ({
        url: `${AuctionListing_URL}/getCompletedAuctions`,
      }),
    }),
    bidderGetOngoingAuctions: builder.mutation({
      query: () => ({
        url: `${Bidder_URL}/getOngoingAuctions`,
        method: "POST",
      }),
    }),
    bidderGetFinicheAuctions: builder.mutation({
      query: () => ({
        url: `${Bidder_URL}/getFinichedAuctions`,
        method: "POST",
      }),
    }),
    bidderGetWonAuctions: builder.mutation({
      query: () => ({
        url: `${Bidder_URL}/getWonAuctions`,
        method: "POST",
      }),
    }),
    bidderSendStartingNotifications: builder.mutation({
      query: (data) => ({
        url: `${Bidder_URL}/sendAuctionRoomStartingNotification`,
        method: "POST",
        body: data,
      }),
    }),
    bidderGetAuctionRoomInfo: builder.mutation({
      query: (data) => ({
        url: `${AuctionRoom_URL}/getRoomInfo`,
        method: "POST",
        body: data,
      }),
    }),
    bidderUpdateAuctionRoom: builder.mutation({
      query: (data) => ({
        url: `${AuctionRoom_URL}/updateAuctionRoom`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useBiddersignupMutation } = bidderApiSlice;
