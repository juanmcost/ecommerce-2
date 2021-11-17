import { createReducer, createAsyncThunk } from "@reduxjs/toolkit"; // import redux tool-kit
import axios from "axios"; // import axios

//---------------CONFIG PRODUCT --------------\\

const API = '"http://localhost:8080/api/product"'

//--GET ALL Product

export const getAllProduct = createAsyncThunk("GET_ALL_PRODUCT", () => {
  return axios.get(`${API}/`).then((res) => res.data);
});

export const createProduct = createAsyncThunk("CREATE_PRODUCT", () => {
  return axios.post("").then((res) => res.data);
});

//--GET TAGS

export const getTags = createAsyncThunk("GET_TAGS", () => {
  return axios.get(`${API}/:tag`).then((res) => res.data);
});

//--GET all Products

export const getAllProducts = createAsyncThunk("GET_ALL_PRODUCTS", async () => { 
  return axios.get("http://localhost:8080/api/product/").then(res => res.data);
});

//--GET Product

export const getProduct = createAsyncThunk("GET_PRODUCT", (id) => {
  return axios.get(`http://localhost:8080/api/product/${id}`).then(res => res.data);
});

//--GET Product Title

export const getProductTitle = createAsyncThunk("GET_PRODUCT", () => {
  return axios.get(`${API}/search:title`).then((res) => res.data);
});

//------ADMIN------\\

//--create Product

export const addProduct = createAsyncThunk("CREATE_PRODUCT", () => {
  return axios.post(`http://localhost:8080/api/product/add`).then((res) => res.data);
});


export const modifyProduct = createAsyncThunk("UPDATE_PRODUCT", () => {
    return axios.put(`${API}/:id`).then((res) => res.data);
  });

//--delete Product

export const removeProduct = createAsyncThunk("DELETE_PRODUCT", () => {
  return axios.delete(`${API}/:id`).then((res) => res.data);
});


//--Config Reducer

const productReducer = createReducer([], {
  [createProduct.fulfilled]: (state, action) => action.payload,
  [getProduct.fulfilled]: (state, action) => action.payload,
  [getAllProducts.fulfilled]: (state, action) => action.payload,
  [getTags.fulfilled]: (state, action) => action.payload,
  [addProduct.fulfilled]: (state, action) => action.payload,
  [modifyProduct.fulfilled]: (state, action) => action.payload,
  [removeProduct.fulfilled]: (state, action) => action.payload,
  [getProductTitle.fulfilled]: (state, action) => action.payload,
});

export default productReducer;