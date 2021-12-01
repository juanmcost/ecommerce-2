import { createReducer, createAsyncThunk } from '@reduxjs/toolkit'; // import redux tool-kit
import axios from 'axios'; // import axios

//------REVIEWS------\\

export const addAppreciation = createAsyncThunk('ADD_APPRECIATION', async ({ id, appreciation }) => {
    const { data } = await axios.put(`/api/product/appreciation/${id}`, { appreciation });
    return data;
});

export const addReview = createAsyncThunk('ADD_REVIEW', async ({ id, username, review }) => {
    const { data } = await axios.put(`/api/product/review/${id}`, { username, review });
    return data;
});

//--Config Reducer

const reviewReducer = createReducer([], {
    [addReview.fulfilled]: (state, action) => (state = action.payload),
    [addAppreciation.fulfilled]: (state, action) => (state = action.payload),
});

export default reviewReducer;
