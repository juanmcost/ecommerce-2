import {
    createAction,
  } from "@reduxjs/toolkit";
  const SET_ADDRESS = "SET_ADDRESS"
  const SET_PRODUCTS = "SET_PRODUCTS"
  const SET_PAYMETHOD = "SET_PAYMETHOD"
  
//---------------CONFIG ORDER -------------- \\

//--Config Logout

export const setAddress = createAction(SET_ADDRESS);
export const setProducts = createAction(SET_PRODUCTS);
export const setPayMethod = createAction(SET_PAYMETHOD);
  
const orderReducer = function(state = {}, action){
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
      default:
          return state;
  }
}

export default orderReducer;