import {
    createAction,
  } from "@reduxjs/toolkit";
  const SET_ADDRESS = "SET_ADDRESS"
  
//---------------CONFIG ORDER -------------- \\

export const setAddress = createAction(SET_ADDRESS);
  
const addressReducer = function(state = {}, action){
  switch(action.type){
      case SET_ADDRESS: {
            const {payload} = action;
            return payload;}
      default:
          return state;
  }
}

export default addressReducer;