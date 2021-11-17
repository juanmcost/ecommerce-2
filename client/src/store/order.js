import {
    createAction,
  } from "@reduxjs/toolkit";
  const SET_ADDRESS = "SET_ADDRESS"
  const SET_PRODUCTS = "SET_PRODUCTS"
  const SET_PAYMETHOD = "SET_PAYMETHOD"
  const SET_STATUS = "SET_STATUS"
  
//---------------CONFIG ORDER -------------- \\

//--Config Logout

export const setAddress = createAction(SET_ADDRESS);
export const setProducts = createAction(SET_PRODUCTS);
export const setPayMethod = createAction(SET_PAYMETHOD);
export const setStatus = createAction(SET_STATUS);
  
const orderReducer = function(state = {status: ""}, action){
  switch(action.type){
      case SET_ADDRESS:
        {
          const {payload} = action
          return {
            ...state,
            address: payload
          };
        }
      case SET_PRODUCTS:
        {
          const {payload} = action
          return {
            ...state,
            products: payload.list,
            amount: payload.total
          };
        }
      case SET_PAYMETHOD:
        {
          const {payload} = action
          return {
            ...state,
            payMethod: payload
          };
        }
      case SET_STATUS:
        {
          const {payload} = action
          return {
            ...state,
            status: payload
          };
        }
      default:
          return state;
  }
}

export default orderReducer;