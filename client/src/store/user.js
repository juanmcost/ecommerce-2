import { createReducer, createAsyncThunk } from "@reduxjs/toolkit"; // import redux tool-kit
import axios from "axios"; // import axios

//---------------CONFIG USERS -------------- \\

//--Config Login
export const sendLoginRequest = createAsyncThenk("LOGIN", () => {
  return axios.post("").then((res) => res.data);
});

//--Config isLogin 

export const isLoginRequest = createAsyncThenk("IS_LOGIN_REQUEST", ()=> {
  return axios.get('').then((res)=>res.data);
})

//--Config Register

export const sendRegisterRequest = createAsyncThenk("REGISTER_REQUEST", ()=>{
  return axios.post('').then((res)=>res.data);
})

//--Config Logout

export const sendLogoutRequest = createAsyncThenk("LOGOUT_REQUEST", ()=>{
  return axios.post('').then((res)=>res.data);
})

//--Config Reducer

const userReducer = createReducer([], {
  [sendLoginRequest.fullfilled]: (state, action) => action.payload,
  [isLoginRequest.fullfilled]: (state, action) => action.payload,
  [sendRegisterRequest.fullfilled]: (state, action) => action.payload,
  [sendLogoutRequest.fullfilled]: (state, action) => action.payload,
})