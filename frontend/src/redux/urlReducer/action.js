import {
  POST_SHORTEN_ERROR,
  POST_SHORTEN_LOADING,
  POST_SHORTEN_SUCCESS,
  GET_ALLURLS_ERROR,
  GET_ALLURLS_LOADING,
  GET_ALLURLS_SUCCESS,
} from "./actionTypes";
import axios from "axios";

export const shortenUrl = (token, obj, toast) => async (dispatch) => {
  dispatch({ type: POST_SHORTEN_LOADING });
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/shorten`,
      obj,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // Handle the server response here
    dispatch({ type: POST_SHORTEN_SUCCESS, payload: response.data.url });
    toast({
      title: "Link Generated Successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    console.log(response);
  } catch (error) {
    console.log(error);
    dispatch({ type: POST_SHORTEN_ERROR });
    toast({
      title: "Failed To Generate Link",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }
};

export const getAll = (token, toast) => async (dispatch) => {
  dispatch({ type: GET_ALLURLS_LOADING });
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/user/all`,
      config
    );
    dispatch({ type: GET_ALLURLS_SUCCESS, payload: response.data.urls });
  } catch (error) {
    dispatch({ type: GET_ALLURLS_ERROR });
    toast({
      title: "Failed to Load your URLs",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }
};
