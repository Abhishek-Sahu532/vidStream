import {
  NEW_COMMENT_FAIL,
  NEW_COMMENT_REQUEST,
  NEW_COMMENT_SUCCESS,
  GET_COMMENT_REQUEST,
  GET_COMMENT_SUCCESS,
  GET_COMMENT_FAIL,
  CLEAR_ERRORS,
} from "../constaints/CommentConstaints";

export const createCommentReducer = (state = {}, action) => {
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

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const allCommentReducer = (state = [], action) => {
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
        comments: action.payload.data,
        success: true,
      };
    case GET_COMMENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
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
