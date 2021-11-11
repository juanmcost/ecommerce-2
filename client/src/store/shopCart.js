import { createReducer, createAsyncThunk, createAction } from "@reduxjs/toolkit"; // import redux tool-kit
import axios from "axios"; // import axios
import { errorToast } from "../utils/toastMessages";
import { useToast } from "@chakra-ui/react";

//---------------CONFIG CART -------------- \\

//--Set cart

export const setCart = createAction("SET_CART", (newCart) => {
  return newCart
})

//--Add products

export const addProduct = createAsyncThunk("ADD_PRODUCT", () => {
  return axios.put("").then((res) => res.data);
});

//--remove Product

export const removeProduct = createAsyncThunk("REMOVE_PRODUCT", (index, cart) => {
  let auxCart = cart;
  auxCart.total -= auxCart.list[index].product.price * auxCart.list[index].quantity
  auxCart.list.splice(index,1);
  return auxCart;
});

//--Add quantity

export const addQuantity = createAction("ADD_QUANTITY", (index, cart) => {
  let auxCart = cart;
  auxCart.list[index].quantity+=1;
  auxCart.total += auxCart.list[index].product.price
  return auxCart;
});

//--remove quantity

export const removeQuantity = createAction("REMOVE_QUANTITY", (index, cart) => {
  const toast = useToast();
  let auxCart = cart;
  if (auxCart.list[index].quantity>1) {
    auxCart.list[index].quantity-=1;
    auxCart.total -= auxCart.list[index].product.price
  } else {
    errorToast(toast, "use the delete button");
  }
  return auxCart;
});


//--Config Reducer

const shopCartReducer = createReducer({list: [], total: 0}, {
  [setCart]: (state, action) => action.payload,
  [addQuantity]: (state, action) => action.payload,
  [removeQuantity]: (state, action) => action.payload,
  [addProduct.fullfilled]: (state, action) => action.payload,
  [removeProduct.fullfilled]: (state, action) => action.payload
});

export default shopCartReducer;