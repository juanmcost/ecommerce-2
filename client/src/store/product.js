import { createReducer, createAsyncThunk } from "@reduxjs/toolkit"; // import redux tool-kit
import axios from "axios"; // import axios

//---------------CONFIG PRODUCT -------------- \\

//--create Product

export const createProduct = createAsyncThenk("CREATE_PRODUCT", () => {
  return axios.post("").then((res) => res.data);
});

//--GET Product

export const getProduct = createAsyncThenk("GET_PRODUCT", () => {
  return axios.get("").then((res) => res.data);
});

//--update Product

export const updateProduct = createAsyncThenk("UPDATE_PRODUCT", () => {
    return axios.put("").then((res) => res.data);
  });

//--delete Product

export const deleteProduct = createAsyncThenk("DELETE_PRODUCT", () => {
  return axios.delete("").then((res) => res.data);
});


//--Config Reducer

const productReducer = createReducer([], {
  [createProduct.fullfilled]: (state, action) => action.payload,
  [getProduct.fullfilled]: (state, action) => action.payload,
  [updateProduct.fullfilled]: (state, action) => action.payload,
  [deleteProduct.fullfilled]: (state, action) => action.payload,
});

export default productReducer;
