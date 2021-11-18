import { createReducer, createAsyncThunk } from "@reduxjs/toolkit"; // import redux tool-kit
import axios from "axios"; // import axios

//------REVIEWS------\\

//--add Review

export const addReview = createAsyncThunk("ADD_REVIEW", (info) => {
	axios({
		url: `http://localhost:8080/api/product/review/${info.id}`, 
		method: 'put',
		data: info.review
});
axios({
	url: `http://localhost:8080/api/product/appreciation/${info.id}`, 
	method: 'put',
	data: info
});
	return info
});

//--add Review

export const getAllReviews = createAsyncThunk("GET_REVIEWS", (id) => {
	return  axios.get( `http://localhost:8080/api/product/reviews/${id}` );
});

//--Config Reducer

const reviewReducer = createReducer([], {
  [getAllReviews.fulfilled]: (state, action) => action.payload,
  [addReview.fulfilled]: (state, action) => action.payload,
});

export default reviewReducer;