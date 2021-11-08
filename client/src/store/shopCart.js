import { createReducer, createAsyncThunk } from "@reduxjs/toolkit"; // import redux tool-kit
import axios from "axios"; // import axios

//---------------CONFIG CART -------------- \\

//--Add products

export const addProduct = createAsyncThenk("ADD_PRODUCT", () => {
  return axios.put("").then((res) => res.data);
});

//--remove Product

export const removeProduct = createAsyncThenk("REMOVE_PRODUCT", () => {
  return axios.delete("").then((res) => res.data);
});

//--Config Reducer

const shopCartReducer = createReducer([], {
  [addProduct.fullfilled]: (state, action) => action.payload,
  [removeProduct.fullfilled]: (state, action) => action.payload,
});

export default shopCartReducer;