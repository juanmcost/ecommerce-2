import { createReducer, createAsyncThunk } from "@reduxjs/toolkit"; // import redux tool-kit
import axios from "axios"; // import axios

//---------------CONFIG AUTH -------------- \\

const API = "http://localhost:8080/api/auth"

//--Config Login
export const sendLoginRequest = createAsyncThunk('LOGIN', (login) => {
  return axios.post(`${API}/signin`, login).then((res) => {
      if (res.status === 200) {
          return res.data[0];
      }
  });
});

//--Config isLogin 

export const isLoginRequest = createAsyncThunk("IS_LOGIN_REQUEST", ()=> {
  return axios.get('').then((res)=>res.data);
})

//--Config Register

export const sendRegisterRequest = createAsyncThunk("REGISTER_REQUEST", (prop)=>{
  return axios.post(`${API}/signup`, prop).then((res)=>res.data);
})

//--Config Logout

export const sendLogoutRequest = createAsyncThunk("LOGOUT_REQUEST", ()=>{
  return axios.get(`${API}/logout`).then((res)=>res.data);
})

//--Config Reducer

const authReducer = createReducer([], {
  [sendLoginRequest.fullfilled]: (state, action) => action.payload,
  [isLoginRequest.fullfilled]: (state, action) => action.payload,
  [sendRegisterRequest.fullfilled]: (state, action) => action.payload,
  [sendLogoutRequest.fullfilled]: (state, action) => action.payload,
})

export default authReducer;