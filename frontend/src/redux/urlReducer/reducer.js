import {
  POST_SHORTEN_ERROR,
  POST_SHORTEN_LOADING,
  POST_SHORTEN_SUCCESS,
  GET_ALLURLS_ERROR,
  GET_ALLURLS_LOADING,
  GET_ALLURLS_SUCCESS,
} from "./actionTypes";

const initState = {
  isLoading: false,
  isError: false,
  recent: null,
  all: [],
};

export const reducer = (state = initState, action) => {
  switch (action.type) {
    case POST_SHORTEN_ERROR:
      return {
        ...state,
        isError: true,
        isLoading: false,
      };
    case POST_SHORTEN_LOADING:
      return {
        ...state,
        isError: false,
        isLoading: true,
      };
    case POST_SHORTEN_SUCCESS:
      return {
        ...state,
        isError: false,
        isLoading: false,
        recent: action.payload,
        all: [...state.all, action.payload],
      };
    case GET_ALLURLS_ERROR:
      return {
        ...state,
        isError: true,
        isLoading: false,
      };
    case GET_ALLURLS_LOADING:
      return {
        ...state,
        isError: false,
        isLoading: true,
      };
    case GET_ALLURLS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        all: [...action.payload],
      };
    default:
      return state;
  }
};
