import {
  GET_LOGOUT_LOADING,
  GET_LOGOUT_ERROR,
  GET_LOGOUT_SUCCESS,
  POST_CREATEUSER_ERROR,
  POST_CREATEUSER_LOADING,
  POST_CREATEUSER_SUCCESS,
  POST_LOGIN_ERROR,
  POST_LOGIN_LOADING,
  POST_LOGIN_SUCCESS,
} from "./actionTypes";

const initState = {
  isLoading: false,
  isError: false,
  isAuth: false,
  token: null,
};

export const reducer = (state = initState, action) => {
  switch (action.type) {
    case POST_CREATEUSER_LOADING:
      return {
        ...initState,
        isLoading: true,
      };
    case POST_CREATEUSER_ERROR:
      return {
        ...initState,
        isError: true,
      };
    case POST_CREATEUSER_SUCCESS:
      return {
        ...initState,
      };
    case POST_LOGIN_LOADING:
      return {
        ...initState,
        isLoading: true,
      };
    case POST_LOGIN_ERROR:
      return {
        ...initState,
        isError: true,
      };
    case POST_LOGIN_SUCCESS:
      return {
        ...initState,
        isAuth: true,
        token: action.payload,
      };
    case GET_LOGOUT_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_LOGOUT_ERROR:
      return {
        ...state,
      };
    case GET_LOGOUT_SUCCESS:
      return {
        ...initState,
      };
    default:
      return state;
  }
};
