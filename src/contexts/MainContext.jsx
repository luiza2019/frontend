import axios from "axios";
import React, { useReducer } from "react";
import {
  APIpopularProducts,
  APIproducts,
  APIsliderItems,
} from "../helpers/consts";

export const mainContext = React.createContext();

const INIT_STATE = {
  products: null,
  sliderItems: null,
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return { ...state, products: action.payload };
    case "GET_SLIDER_ITEMS":
      return { ...state, sliderItems: action.payload };
    case "GET_POPULAR_PRODUCTS":
      return { ...state, popularProducts: action.payload };
    default:
      return state;
  }
};
const MainContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const getProducts = async () => {
    try {
      const response = await axios(APIproducts);
      let action = {
        type: "GET_PRODUCTS",
        payload: response.data,
      };
      dispatch(action);
    } catch (e) {
      console.log(e);
    }
  };
  const getSliderItems = async () => {
    try {
      const response = await axios(APIsliderItems);
      let action = {
        type: "GET_SLIDER_ITEMS",
        payload: response.data,
      };
      dispatch(action);
    } catch (e) {
      console.log(e);
    }
  };
  const createProduct = async (product) => {
    try {
      const response = await axios.post(APIproducts, product);
      getProducts();
    } catch (e) {
      console.log(e);
    }
  };
  const createSliderItems = async (sliderItems) => {
    try {
      const response = await axios.post(APIsliderItems, sliderItems);
      getSliderItems();
    } catch (e) {
      console.log(e);
    }
  };
  const getPopularProducts = async () => {
    try {
      const response = await axios(APIpopularProducts);
      let action = {
        type: "GET_POPULAR_PRODUCTS",
        payload: response.data,
      };
      dispatch(action);
    } catch (e) {
      console.log(e);
    }
  };
  const createPopularProducts = async (popularProducts) => {
    try {
      const response = await axios.post(APIpopularProducts, popularProducts);
      getSliderItems();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <mainContext.Provider
      value={{
        getProducts,
        createProduct,
        getSliderItems,
        createSliderItems,
        getPopularProducts,
        createPopularProducts,
        products: state.products,
        sliderItems: state.sliderItems,
      }}
    >
      {props.children}
    </mainContext.Provider>
  );
};

export default MainContextProvider;
