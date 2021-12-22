import {
    createAction,
  } from "@reduxjs/toolkit";
  const SET_ADDRESS = "SET_ADDRESS"
  const SET_PRODUCTS = "SET_PRODUCTS"
  const SET_PAYMETHOD = "SET_PAYMETHOD"
  const SET_STATUS = "SET_STATUS"
  const SET_AMOUNT = "SET_AMOUNT"
  const GET_ORDER = "GET_ORDER"
  const RESET = "RESET"
  
//---------------CONFIG ORDER -------------- \\

export const setAddress = createAction(SET_ADDRESS);
export const setProducts = createAction(SET_PRODUCTS);
export const setPayMethod = createAction(SET_PAYMETHOD);
export const setStatus = createAction(SET_STATUS);
export const setAmount = createAction(SET_AMOUNT);
export const getOrder = createAction(GET_ORDER);
export const resetOrder = createAction(RESET);
  
const orderReducer = function(state = {amount: 0}, action){
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
            products: payload
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
      case SET_AMOUNT:
        {
          const {payload} = action
          return {
            ...state,
            amount: payload
          }
        }
      case GET_ORDER: return ({...state})
      case RESET:
        {
          return {status: "", amount: 0};
        }
      default:
          return state;
  }
}

export default orderReducer;