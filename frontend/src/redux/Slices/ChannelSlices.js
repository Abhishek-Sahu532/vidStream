import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  channel: {},
  error: null,
  loading: false,
  success: false,
};

export const ChannelSlices = createSlice({
  name: "channel",
  initialState,
  reducers: {
    getUserChannelRequest: (state) => {
      state.loading = true;
    },
    getUserChannelrSucess: (state, action) => {
      state.channel = action.payload;
      state.loading = false;
      state.success = true;
    },
    getUserChannelFailure: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.error;
    },
  },
});

export const {
  getUserChannelRequest,
  getUserChannelrSucess,
  getUserChannelFailure,
} = ChannelSlices.actions;

export default ChannelSlices.reducer;
