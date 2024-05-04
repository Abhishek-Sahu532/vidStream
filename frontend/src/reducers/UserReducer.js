import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, LOGOUT_FAIL,
  CLEAR_ERRORS,
} from "../constaints/UserConstaints";

export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
    case LOGIN_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        success: true
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case REGISTER_USER_FAIL:
    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case LOGOUT_SUCCESS:
      return {
        loading: false,
        user: null,
        isAuthenticated: false
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
