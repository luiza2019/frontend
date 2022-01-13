import React, { useReducer } from "react";

import axios from "axios";
import $axios from "../axios";

export const userContext = React.createContext();
const INIT_STATE = {
  user: null,
  logSuccess: false,
  errorMSG: null,
};
const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return { ...state, user: action.payload };
    case "LOGOUT_USER":
      return { ...state, user: action.payload };
    case "LOG_SUCCESS":
      return { ...state, logSuccess: action.payload };
    case "ERROR_MSG":
      return { ...state, errorMSG: action.payload };
    default:
      return state;
  }
};

const UserContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const signUpUser = async (email, password) => {
    try {
      let res = await $axios("user");

      let { data } = await $axios.post("user/signup", {
        password,
        email,
      });
      localStorage.setItem("token", JSON.stringify(data));
      await $axios("user");
      dispatch({
        type: "LOGIN_USER",
        payload: data,
      });
      dispatch({
        type: "LOG_SUCCESS",
        payload: true,
      });
    } catch (e) {
      dispatch({
        type: "LOG_SUCCESS",
        payload: false,
      });
      dispatch({
        type: "ERROR_MSG",
        payload: "User with given email has already exists",
      });
      console.log(e);
    }
  };
  const loginUser = async (email, password) => {
    try {
      let res = await $axios("user");
      let user = res.data.find((user) => user.email === email);

      let { data } = await $axios.post("user/login", {
        password,
        email,
      });
      localStorage.setItem("token", JSON.stringify(data));
      await $axios("user");
      dispatch({
        type: "LOGIN_USER",
        payload: data,
      });
      dispatch({
        type: "LOG_SUCCESS",
        payload: true,
      });
      localStorage.setItem("user", JSON.stringify({ email, password }));
    } catch (error) {
      dispatch({
        type: "LOG_SUCCESS",
        payload: false,
      });
      dispatch({
        type: "ERROR_MSG",
        payload: "Wrong mail or password",
      });
      console.log(error + "qweqweqweqwe");
      console.log(state.errorMSG + "qweqweqweqwe");
    }
  };

  const logOut = async () => {
    try {
      localStorage.removeItem("token");
      dispatch({
        type: "LOGOUT_USER",
        payload: null,
      });
      dispatch({
        type: "LOG_SUCCESS",
        payload: false,
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <userContext.Provider
      value={{
        logOut,
        signUpUser,
        loginUser,
        user: state.user,
        logSuccess: state.logSuccess,
        errorMSG: state.errorMSG,
      }}
    >
      {props.children}
    </userContext.Provider>
  );
};

export default UserContextProvider;
