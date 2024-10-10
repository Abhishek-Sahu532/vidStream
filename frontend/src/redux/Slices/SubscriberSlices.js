import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  subscribers: {},
  error: null,
  loading: false,
  success: false,
};

export const SubscriberSlices = createSlice({
  name: "subscriber",
  initialState,
  reducers: {
    createSubscriberRequest: (state) => {
      state.loading == true;
    },
    createSubscriberSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.subscribers = action.payload;
    },
    createSubscriberFailure: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
    deleteSubscriberRequest: (state) => {
      state.loading == true;
    },
    deleteSubscriberSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.subscribers = action.payload;
    },
    deleteSubscriberFailure: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },

   
   
    userSubscriberReset: (state, action) => {
      state.subscribers = action.payload;
    },



    userSubscriptionRequest: (state) => {
      state.loading == true;
    },
    userSubscriptionSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.subscribers = action.payload;
    },
    userSubscriptionFailure: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
    userSubscriberedRequest: (state) => {
      state.loading == true;
    },
    userSubscriberedSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.subscribers = action.payload;
    },
    userSubscriberedFailure: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
  },
});

export const {
  createSubscriberRequest,
  createSubscriberSuccess,
  createSubscriberFailure,
  deleteSubscriberRequest,
  deleteSubscriberSuccess,
  deleteSubscriberFailure,
  userSubscriptionRequest,
  userSubscriptionSuccess,
  userSubscriptionFailure,
  userSubscriberedRequest,
  userSubscriberedSuccess,
  userSubscriberedFailure,
  userSubscriberReset
} = SubscriberSlices.actions;

export default SubscriberSlices.reducer;
