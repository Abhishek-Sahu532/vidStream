import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  videos: [],
  recommendVideos: [],
  error: null,
  loading: false,
  success: false,
};

export const videoSlices = createSlice({
  name: "video",
  initialState,
  reducers: {
    videoUploadRequest: (state) => {
      state.loading = true;
    },
    videoUploadSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
    videoUploadFailure: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
    videoDetailsRequest: (state) => {
      state.loading = true;
    },
    videoDetailsSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.videos = action.payload;
    },
    videoDetailsReset: (state, action) => {
      state.loading = false;
      state.success = true;
      state.videos = action.payload;
    },
    videoDetailsFailure: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
    allVideosRequest: (state) => {
      state.loading = true;
    },
    allVideosSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.videos = action.payload;
    },
    allVideosReset: (state, action) => {
      state.videos = action.payload;
    },
    allVideosFailure: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
    getVideoRequest: (state) => {
      state.loading = true;
    },
    getVideoSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.videos = action.payload;
    },
    getVideoReset: (state, action) => {
      state.videos = action.payload;
    },
    getVideoFailure: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
    getVideoRecommendationRequest: (state) => {
      state.loading = true;
    },
    getVideoRecommendationSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.recommendVideos = action.payload;
    },
    getVideoRecommendationFailure: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
  },
});

export const {
  videoUploadRequest,
  videoUploadSuccess,
  videoUploadFailure,
  videoDetailsRequest,
  videoDetailsSuccess,
  videoDetailsReset,
  videoDetailsFailure,
  allVideosRequest,
  allVideosSuccess,
  allVideosReset,
  allVideosFailure,
  getVideoRequest,
  getVideoSuccess,
  getVideoReset,
  getVideoFailure,
  getVideoRecommendationRequest,
  getVideoRecommendationSuccess,
  getVideoRecommendationFailure,
} = videoSlices.actions;

export default videoSlices.reducer;
