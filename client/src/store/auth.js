import { createReducer, createAsyncThunk } from "@reduxjs/toolkit"; // import redux tool-kit
import axios from "axios"; // import axios

//---------------CONFIG AUTH -------------- \\

const API = "http://localhost:8080/api/auth"


//--Config Register

export const sendRegisterRequest = createAsyncThunk("REGISTER_REQUEST", (prop)=>{
  return axios.post(`${API}/signup`, prop).then((res)=>res.data);
})

//--Config Logout

export const sendLogoutRequest = createAsyncThunk("LOGOUT_REQUEST", ()=>{
  return axios.get(`${API}/logout`).then((res)=>res.data);
})

//--Config Reducer

const authReducer = createReducer({}, {
  [sendRegisterRequest.fulfilled]: (state, action) => action.payload,
  [sendLogoutRequest.fulfilled]: (state, action) => action.payload,
})

export default authReducer;