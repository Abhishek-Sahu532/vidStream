import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  likes: [],
  success: false,
  loading: false,
  error: null,
};

export const LikeSlices = createSlice({
  name: "likes",
  initialState,
  reducers: {
    addVideoLikeDislikeRequest: (state) => {
      state.loading = true;
    },
    addVideoLikeDislikeSuccess: (state, action) => {
      (state.loading = false),
        (state.success = true),
        (state.likes = action.payload);
    },
    addVideoLikeDislikeFailure: (state, action) => {
      (state.loading = false),
        (state.success = false),
        (state.error = action.payload);
    },
    addVideoLikeDislikeReset: (state, action) => {
      state.likes = action.payload;
      state.error = null;
    },
    getLikedVideosRequest: (state) => {
      state.loading = true;
    },
    getLikedVideosRequestSuccess: (state, action) => {
      (state.loading = false),
        (state.success = true),
        (state.likes = action.payload);
    },
    getLikedVideosRequestFailure: (state, action) => {
      (state.loading = false),
        (state.success = false),
        (state.error = action.payload);
    },
  },
});

export const {
  addVideoLikeDislikeRequest,
  addVideoLikeDislikeSuccess,
  addVideoLikeDislikeFailure,
  addVideoLikeDislikeReset,
  getLikedVideosRequest,
  getLikedVideosRequestSuccess,
  getLikedVideosRequestFailure,
} = LikeSlices.actions;

export default LikeSlices.reducer;
