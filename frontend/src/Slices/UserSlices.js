import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: {},
  history: [],
  error: null,
  loading: false,
  success: false,
  message: "",

  loading2: false,
  success2: false,
  message2: "",
  error2: null,
};

export const UserSlices = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerUserRequest: (state) => {
      state.loading = true;
    },
    registerUserSuccess: (state, action) => {
      state.currentUser = {};
      state.loading = false;
      state.success = action.payload.success;
    },
    registerUserFailure: (state, action) => {
      state.currentUser = {};
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
    signinUserRequest: (state) => {
      state.loading = true;
    },
    signinUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.success = true;
    },
    signinUserFailure: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },

    signoutUserSucess: (state, action) => {
      state.currentUser = {};
      state.loading = false;
      state.success = action.payload.success;
    },
    signoutUserFailure: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
    currentUserRequest: (state) => {
      state.loading = true;
    },
    currentUserSucess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.success =true;
    },
    currentUserFailure: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },

    userHistoryRequest: (state) => {
      state.loading = true;
    },
    userHistorySuccess: (state, action) => {
      state.history = action.payload;
      state.loading = false;
      state.success =true;
    },
    userHistoryFailure: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },

    forgetPasswordRequest: (state) => {
      state.loading = true;
    },
    forgetPasswordSuccess: (state, action) => {
      state.loading = false;
      state.success =true;
      state.message = action.payload.message;
    },
    forgetPasswordFailure: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },

    resetPasswordRequest: (state) => {
      state.loading = true;
    },
    resetPasswordSuccess: (state, action) => {
      state.loading = false;
      state.success =true;
      state.message = action.payload.message;
    },
    resetPasswordFailure: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },

    resetPasswordForLoggedInUserRequest: (state) => {
      state.loading2 = true;
    },
    resetPasswordForLoggedInUserSuccess: (state, action) => {
      state.loading2 = false;
      state.success2 = true;
      state.message2 = action.payload.message;
    },
    resetPasswordForLoggedInUserFailure: (state, action) => {
      state.loading2 = false;
      state.success2 = false;
      state.error2 = action.payload;
    },

    updateAvtarRequest: (state) => {
      state.loading2 = true;
    },
    updateAvtarSuccess: (state, action) => {
      state.loading2 = false;
      state.success2 = true;
      state.message2 = action.payload.message;
    },
    updateAvtarFailure: (state, action) => {
      state.loading2 = false;
      state.success2 = false;
      state.error2 = action.payload;
    },

    updateCoverImageRequest: (state) => {
      state.loading2 = true;
    },
    updateCoverImageSuccess: (state, action) => {
      state.loading2 = false;
      state.success2 = true;
      state.message2 = action.payload.message;
    },
    updateCoverImageFailure: (state, action) => {
      state.loading2 = false;
      state.success2 = false;
      state.error2 = action.payload;
    },

    updateUserDetailsRequest: (state) => {
      state.loading2 = true;
    },
    updateUserDetailsSuccess: (state, action) => {
      state.loading2 = false;
      state.success2 = true;
      state.message2 = action.payload.message;
    },
    updateUserDetailsFailure: (state, action) => {
      state.loading2 = false;
      state.success2 = false;
      state.error2 = action.payload;
    },
  },
});

export const {
  registerUserRequest,
  registerUserSuccess,
  registerUserFailure,
  signinUserRequest,
  signinUserSuccess,
  signinUserFailure,
  signoutUserSucess,
  signoutUserFailure,
  currentUserRequest,
  currentUserSucess,
  currentUserFailure,
  getUserChannelRequest,
  getUserChannelrSucess,
  getUserChannelFailure,
  userHistoryRequest,
  userHistorySuccess,
  userHistoryFailure,
  forgetPasswordRequest,
  forgetPasswordSuccess,
  forgetPasswordFailure,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFailure,
  resetPasswordForLoggedInUserRequest,
  resetPasswordForLoggedInUserSuccess,
  resetPasswordForLoggedInUserFailure,
  updateAvtarRequest,
  updateAvtarSuccess,
  updateAvtarFailure,
  updateCoverImageRequest,
  updateCoverImageSuccess,
  updateCoverImageFailure,
  updateUserDetailsRequest,
  updateUserDetailsSuccess,
  updateUserDetailsFailure,
} = UserSlices.actions;

export default UserSlices.reducer;
