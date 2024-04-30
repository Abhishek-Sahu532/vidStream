import {
  VIDEO_UPLOAD_SUCCESS,
  VIDEO_UPLOAD_FAIL,
  VIDEO_UPLOAD_REQUEST,
  CLEAR_ERRORS,
} from "../constaints/VideoConstaints";

export const videoReducer = (state = { video: {} }, action) => {
  switch (action.type) {
    case VIDEO_UPLOAD_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case VIDEO_UPLOAD_SUCCESS:
      return {
        loading: false,
        success: action.payload.message,
        video: action.payload.video,
      };
    case VIDEO_UPLOAD_FAIL:
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
