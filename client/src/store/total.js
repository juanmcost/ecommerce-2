import {
    createAction,
  } from "@reduxjs/toolkit";
  const SET_TOTAL = "SET_TOTAL";
  const SUM_TOTAL = "SUM_TOTAL";

export const setTotal = createAction(SET_TOTAL);
export const sumTotal = createAction(SUM_TOTAL);
  
const totalReducer = function(state = 0, action){
  switch(action.type){
      case SET_TOTAL: return action.payload;
      case SUM_TOTAL: return state + action.payload;
      default:
          return state;
  }
}

export default totalReducer;