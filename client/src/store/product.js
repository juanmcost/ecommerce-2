import { createReducer, createAsyncThunk } from "@reduxjs/toolkit"; // import redux tool-kit
import axios from "axios"; // import axios

//---------------CONFIG PRODUCT -------------- \\

const API = '"http://localhost:8080/api/product"'

//--GET ALL Product

export const getAllProduct = createAsyncThenk("GET_ALL_PRODUCT", () => {
  return axios.get(`${API}/`).then((res) => res.data);
});

//--GET TAGS

export const getTags = createAsyncThenk("GET_TAGS", () => {
  return axios.get(`${API}/:tag`).then((res) => res.data);
});

//--GET Product

export const getProduct = createAsyncThenk("GET_PRODUCT", () => {
  return axios.get(`${API}/:id`).then((res) => res.data);
});

//--GET Product Title

export const getProductTitle = createAsyncThenk("GET_PRODUCT", () => {
  return axios.get(`${API}/search:title`).then((res) => res.data);
});



//------ADMIN------\\

//--create Product

export const addProduct = createAsyncThenk("CREATE_PRODUCT", () => {
  return axios.post(`${API}/add`).then((res) => res.data);
});


//--update Product

export const modifyProduct = createAsyncThenk("UPDATE_PRODUCT", () => {
    return axios.put(`${API}/:id`).then((res) => res.data);
  });

//--delete Product

export const removeProduct = createAsyncThenk("DELETE_PRODUCT", () => {
  return axios.delete(`${API}/:id`).then((res) => res.data);
});


//--Config Reducer

const productReducer = createReducer([], {
  [getTags.fulfilled]: (state, action) => action.payload,
  [getProduct.fulfilled]: (state, action) => action.payload,
  [addProduct.fulfilled]: (state, action) => action.payload,
  [modifyProduct.fulfilled]: (state, action) => action.payload,
  [removeProduct.fulfilled]: (state, action) => action.payload,
  [getAllProduct.fulfilled]: (state, action) => action.payload,
  [getProductTitle.fulfilled]: (state, action) => action.payload,
});

export default productReducer;
