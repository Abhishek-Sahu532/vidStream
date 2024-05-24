import {   ADD_VIDEO_LIKE_DISLIKE_REQUEST,  ADD_VIDEO_LIKE_DISLIKE_SUCCESS, ADD_VIDEO_LIKE_DISLIKE_FAIL ,ADD_VIDEO_LIKE_DISLIKE_RESET ,CLEAR_ERRORS } from "../constaints/LikeConsttaints";


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


  