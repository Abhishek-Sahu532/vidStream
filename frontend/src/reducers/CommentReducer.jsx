import {
  NEW_COMMENT_FAIL,
  NEW_COMMENT_REQUEST,
  NEW_COMMENT_RESET,
  NEW_COMMENT_SUCCESS,
  GET_COMMENT_REQUEST,
  GET_COMMENT_SUCCESS,
  GET_COMMENT_FAIL,
  GET_COMMENT_RESET,
  CLEAR_ERRORS,
} from "../constaints/CommentConstaints";

export const createCommentReducer = (state = { comments: {} }, action) => {
  switch (action.type) {
    case NEW_COMMENT_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case NEW_COMMENT_SUCCESS:
      return {
        ...state,
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

export const allCommentReducer = (state = { comments: [] }, action) => {
  switch (action.type) {
    case GET_COMMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        comments: action.payload,
        success: true,
      };
    case GET_COMMENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_COMMENT_RESET:
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
