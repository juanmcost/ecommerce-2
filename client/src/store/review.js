import { createReducer, createAsyncThunk } from "@reduxjs/toolkit"; // import redux tool-kit
import axios from "axios"; // import axios

//------REVIEWS------\\

//--add Review

export const addReview = createAsyncThunk("ADD_REVIEW", (info) => {
  return axios({
		url: `http://localhost:8080/api/product/review/${info.id}`, 
		method: 'post',
		data: info.review
});
//   axios({
// 		url: `http://localhost:8080/api/product/appreciation/${info.id}`,
// 		method: 'POST',
// 		data: info.appreciation
// });
  return info
});

//--add Review

export const getReviews = createAsyncThunk("GET_REVIEWS", (info) => {
  return axios({
		url: `http://localhost:8080/api/product/review/${info.id}`, 
		method: 'get',
		data: info.review
	});
});

//--Config Reducer

const reviewReducer = createReducer([], {
  [addReview.fulfilled]: (state, action) => action.payload,
});

export default reviewReducer;