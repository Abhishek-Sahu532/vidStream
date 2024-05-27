import {
  ADD_VIDEO_LIKE_DISLIKE_REQUEST,
  ADD_VIDEO_LIKE_DISLIKE_SUCCESS,
  ADD_VIDEO_LIKE_DISLIKE_FAIL,
  ADD_VIDEO_LIKE_DISLIKE_RESET,
  GET_LIKED_VIDEOS_REQUEST,
  GET_LIKED_VIDEOS_SUCCESS,
  GET_LIKED_VIDEOS_FAIL,
  CLEAR_ERRORS,
} from "../constaints/LikeConsttaints";

export const AddLikeDislikeReducerReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_VIDEO_LIKE_DISLIKE_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case ADD_VIDEO_LIKE_DISLIKE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        message: action.payload,
      };
    case ADD_VIDEO_LIKE_DISLIKE_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    case ADD_VIDEO_LIKE_DISLIKE_RESET:
      return {
        ...state,
        loading: false,
        success: false,
        error: null,
      };
    case CLEAR_ERRORS:
      return {
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const LikedVideoReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_LIKED_VIDEOS_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case GET_LIKED_VIDEOS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        videos: action.payload.data,
      };
    case GET_LIKED_VIDEOS_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
