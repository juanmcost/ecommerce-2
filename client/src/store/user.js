import {
  createReducer,
  createAsyncThunk,
  createAction,
} from "@reduxjs/toolkit"; // import redux tool-kit
import axios from "axios"; // import axios

//---------------CONFIG USERS -------------- \\


//--Config Login
export const sendLoginRequest = createAsyncThunk("LOGIN", (login) => {
  return axios.post(`api/auth/signin`, login).then((res) => {
    if (res.status === 200) {
      return res.data[0];
    }
  });
});

//--GET all users

export const getAllUser = createAsyncThunk("GET_ALL_USERS", (prop) => {
  return axios.get(`api/user/`).then((res) => res.data);
});

//--GET one user

export const getUser = createAction("GET_USER");

//--PUT one user

export const editUser = createAsyncThunk("PUT_USER", (prop) => {
  return axios.put(`api/user/${prop.id}`, prop.data).then((res) => res.data);
});

//-- PUT ADMIN USER

export const adminUser = createAsyncThunk("PUT_ADMIN", (prop) => {
  return axios.put(`api/user/admin/${prop.id}`).then((res) => res.data);
});

//--DELETE one user

export const deleteUser = createAsyncThunk("DELETE_USER", (prop) => {
  return axios.delete(`api/user/${prop.id}`).then((res) => res.data);
});

//--Config Reducer

const userReducer = createReducer(
  {},
  {
    [sendLoginRequest.fulfilled]: (state, action) => action.payload,
    [getAllUser.fulfilled]: (state, action) => action.payload,
    [getUser]: (state, action) => action.payload,
    [editUser.fulfilled]: (state, action) => action.payload,
    [adminUser.fulfilled]: (state, action) => action.payload,
    [deleteUser.fulfilled]: (state, action) => action.payload,
  }
);

export default userReducer;
