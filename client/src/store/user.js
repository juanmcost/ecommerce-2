import { createReducer, createAsyncThunk } from "@reduxjs/toolkit"; // import redux tool-kit
import axios from "axios"; // import axios

//---------------CONFIG USERS -------------- \\

const API = "http://localhost:8080/api/user";

//--GET all users

export const getAllUser = createAsyncThunk("GET_ALL_USERS", (prop) => {
  return axios.get(`${API}/`).then((res) => res.data);
});

//--GET one user

export const getUser = createAsyncThunk("GET_USER", (prop) => {
  return axios.get(`${API}/${prop.id}`).then((res) => res.data);
});

//--PUT one user

export const editUser = createAsyncThunk("GET_USER", (prop) => {
  return axios.put(`${API}/${prop.id}`, prop.data).then((res) => res.data);
});

//-- PUT ADMIN USER

export const adminUser = createAsyncThunk("GET_USER", (prop) => {
  return axios.put(`${API}/admin/${prop.id}`).then((res) => res.data);
});

//--DELETE one user

export const deleteUser = createAsyncThunk("GET_USER", (prop) => {
  return axios.delete(`${API}/${prop.id}`).then((res) => res.data);
});

//--Config Reducer

const userReducer = createReducer([], {
  [getAllUser.fulfilled]: (state, action) => action.payload,
  [getUser.fulfilled]: (state, action) => action.payload,
  [editUser.fulfilled]: (state, action) => action.payload,
  [adminUser.fulfilled]: (state, action) => action.payload,
  [deleteUser.fulfilled]: (state, action) => action.payload,
});

export default userReducer;
