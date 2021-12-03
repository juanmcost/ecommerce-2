import { createReducer, createAsyncThunk } from '@reduxjs/toolkit'; // import redux tool-kit
import axios from 'axios'; // import axios

//---------------CONFIG PRODUCT --------------\\

const API = '/api/product';
const fileOptions = {
    headers: { 'Content-Type': 'multipart/form-data' },
};

//--GET ALL Product

export const getAllProduct = createAsyncThunk('GET_ALL_PRODUCT', () => {
    return axios.get(`${API}/`).then((res) => res.data);
});

//--GET TAGS

export const getTags = createAsyncThunk('GET_TAGS', () => {
    return axios.get(`${API}/:tag`).then((res) => res.data);
});

//--GET all Products

export const getAllProducts = createAsyncThunk('GET_ALL_PRODUCTS', async () => {
    return axios.get(`${API}/`).then((res) => res.data);
});

//--GET Product

export const getProduct = createAsyncThunk('GET_PRODUCT', (id) => {
    return axios.get(`http://localhost:8080/api/product/${id}`).then((res) => res.data);
});

//--GET Product Title

export const getProductTitle = createAsyncThunk('GET_PRODUCT', async (title) => {
    return axios.get(`${API}/search/${title}`).then((res) => res.data);
});

//------ADMIN------\\

//--create Product

export const createProduct = createAsyncThunk('CREATE_PRODUCT', (images) => {
    return axios.post(`http://localhost:8080/api/product/add`, images, fileOptions).then((res) => res.data);
});

export const modifyProduct = createAsyncThunk('UPDATE_PRODUCT', () => {
    return axios.put(`${API}/:id`).then((res) => res.data);
});

//--delete Product

export const removeProduct = createAsyncThunk('DELETE_PRODUCT', () => {
    return axios.delete(`${API}/:id`).then((res) => res.data);
});

//--Config Reducer

const productReducer = createReducer(
    {},
    {
        [getProduct.fulfilled]: (state, action) => action.payload,
        [getAllProducts.fulfilled]: (state, action) => action.payload,
        [getTags.fulfilled]: (state, action) => action.payload,
        [createProduct.fulfilled]: (state, action) => action.payload,
        [modifyProduct.fulfilled]: (state, action) => action.payload,
        [removeProduct.fulfilled]: (state, action) => action.payload,
        [getProductTitle.fulfilled]: (state, action) => action.payload,
    }
);

export default productReducer;
