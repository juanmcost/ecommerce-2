import { createReducer, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const sendRegisterRequest = createAsyncThunk('REGISTER_REQUEST', (prop) => {
    return axios.post(`/api/auth/signup`, prop).then((res) => res.data);
});

export const sendLogoutRequest = createAsyncThunk('LOGOUT_REQUEST', () => {
    return axios.get(`/api/auth/logout`).then((res) => res.data);
});

const authReducer = createReducer(
    {},
    {
        [sendRegisterRequest.fulfilled]: (state, action) => action.payload,
    }
);

export default authReducer;
