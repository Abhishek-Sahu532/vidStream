import {
  VIDEO_UPLOAD_SUCCESS,
  VIDEO_UPLOAD_FAIL,
  VIDEO_UPLOAD_REQUEST,
  CLEAR_ERRORS,
  VIDEO_FETCHED_REQUEST,
  VIDEO_FETCHED_SUCCESS,
  VIDEO_FETCHED_FAIL,
  VIDEO_FETCHED_RESET,
  VIDEO_DETAILS_REQUEST,
  VIDEO_DETAILS_SUCCESS,
  VIDEO_DETAILS_FAIL,
} from "../constaints/VideoConstaints";

export const videoReducer = (state = { video: {} }, action) => {
  switch (action.type) {
    case VIDEO_UPLOAD_REQUEST:
    case VIDEO_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case VIDEO_UPLOAD_SUCCESS:
    case VIDEO_DETAILS_SUCCESS:
      return {
        loading: false,
        success: action.payload.message,
        video: action.payload.data,
      };
    case VIDEO_UPLOAD_FAIL:
    case VIDEO_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const getAllVideosReducer = (state = { videos: [] }, action) => {
  switch (action.type) {
    case VIDEO_FETCHED_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case VIDEO_FETCHED_SUCCESS:
      return {
        loading: false,
        success: action.payload.message,
        videos: action.payload.data,
      };
    case VIDEO_FETCHED_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case VIDEO_FETCHED_RESET:
      return {
        ...state,
        loading: false,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
