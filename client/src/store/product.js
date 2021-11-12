import { createReducer, createAsyncThunk } from "@reduxjs/toolkit"; // import redux tool-kit
import axios from "axios"; // import axios

//---------------CONFIG PRODUCT --------------\\

//--create Product

export const createProduct = createAsyncThunk("CREATE_PRODUCT", () => {
  return axios.post("").then((res) => res.data);
});

//--GET all Products

export const getAllProducts = createAsyncThunk("GET_ALL_PRODUCTS", async () => { 
  return axios.get("http://localhost:8080/api/product/").then(res => res.data);
});

//--GET Product

export const getProduct = createAsyncThunk("GET_PRODUCT", () => {
  return axios.get("").then((res) => res.data);
});

//--update Product

export const updateProduct = createAsyncThunk("UPDATE_PRODUCT", () => {
    return axios.put("").then((res) => res.data);
  });

//--delete Product

export const deleteProduct = createAsyncThunk("DELETE_PRODUCT", () => {
  return axios.delete("").then((res) => res.data);
});


//--Config Reducer

const productReducer = createReducer([], {
  [createProduct.fulfilled]: (state, action) => action.payload,
  [getProduct.fulfilled]: (state, action) => action.payload,
  [updateProduct.fulfilled]: (state, action) => action.payload,
  [deleteProduct.fulfilled]: (state, action) => action.payload,
  [getAllProducts.fulfilled]: (state, action) => action.payload,
});

export default productReducer;