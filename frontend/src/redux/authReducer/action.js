import {
  POST_CREATEUSER_ERROR,
  POST_CREATEUSER_LOADING,
  POST_CREATEUSER_SUCCESS,
  POST_LOGIN_ERROR,
  POST_LOGIN_LOADING,
  POST_LOGIN_SUCCESS,
  GET_LOGOUT_ERROR,
  GET_LOGOUT_LOADING,
  GET_LOGOUT_SUCCESS,
} from "./actionTypes";
import axios from "axios";

export const createUser = (user, toast, navigate) => async (dispatch) => {
  dispatch({ type: POST_CREATEUSER_LOADING });
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/signup`,
      user,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // Handle the server response here
    // console.log(response);
    navigate("/login");
    dispatch({ type: POST_CREATEUSER_SUCCESS });
    toast({
      title: "SignUp successfull",
      description: `${response.data.message}`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: POST_CREATEUSER_ERROR });
    toast({
      title: "SignUp Failed",
      description: `${error.response.data.message}`,
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  }
};

export const loginUser = (user, toast, navigate) => async (dispatch) => {
  dispatch({ type: POST_LOGIN_LOADING });
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/login`,
      user,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response, "LOGIN");
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      dispatch({ type: POST_LOGIN_SUCCESS, payload: response.data.token });
      navigate("/");
      toast({
        title: "Login Successfull",
        description: `${response.data.message}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: POST_LOGIN_ERROR });
    toast({
      title: "Login Failed",
      description: `${error.response.data.message}`,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }
};

export const logoutUser = (token, toast, navigate) => async (dispatch) => {
  dispatch({ type: GET_LOGOUT_LOADING });
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/auth/logout`,
      config
    );
    localStorage.removeItem("token");
    toast({
      title: "Logout Successfull",
      description: `${response.data.message}`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    dispatch({ type: GET_LOGOUT_SUCCESS });
    navigate("/");
  } catch (error) {
    console.log("Error whlie logging out:", error);
    dispatch({ type: GET_LOGOUT_ERROR });
    toast({
      title: "Logout Failed",
      description: `${error.response.data.message}`,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }
};
