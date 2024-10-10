import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  comments: {},
  loading: false,
  success: false,
  error: null,
};

export const CommentSlices = createSlice({
  name: "comment",
  initialState,
  reducers: {
    newCommentRequest: (state) => {
      state.loading = true;
    },
    newCommentSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.comments = action.payload;
    },
    newCommentFailure: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
    getCommentsRequest: (state) => {
      state.loading = true;
    },
    getCommentsSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.comments = action.payload;
    },
    getCommentsFailure: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
  },
});

export const {
  newCommentRequest,
  newCommentSuccess,
  newCommentFailure,
  getCommentsRequest,
  getCommentsSuccess,
  getCommentsFailure,
} = CommentSlices.actions;

export default CommentSlices.reducer;
