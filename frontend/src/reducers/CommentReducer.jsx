import {
  NEW_COMMENT_FAIL,
  NEW_COMMENT_REQUEST,
  NEW_COMMENT_RESET,
  NEW_COMMENT_SUCCESS,
  CLEAR_ERRORS,
} from "../constaints/CommentConstaints";

export const createCommentReducer = (state = { comment: {} }, action) => {
  switch (action.type) {
    case NEW_COMMENT_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case NEW_COMMENT_SUCCESS:
      return {
        loading: false,
        success: true,
        comment: action.payload,
      };
    case NEW_COMMENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case NEW_COMMENT_RESET:
      return {
        ...state,
        loading: false,
        success: false,
        error: null,
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
