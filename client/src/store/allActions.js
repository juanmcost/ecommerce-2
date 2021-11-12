import * as auth from './auth'
import * as product from './product'
import * as shopCart from './shopCart'
import * as user from './user'

//auth Reducer
export const sendRegisterRequest = auth.sendRegisterRequest;
export const sendLogoutRequest = auth.sendLogoutRequest;

//product Reducer
export const createProduct = product.createProduct;
export const getAllProducts = product.getAllProducts;
export const getProduct = product.getProduct;
export const modifyProduct = product.modifyProduct;
export const removeProduct = product.removeProduct;

//shopCart Reducer
export const addProduct = shopCart.addProduct;
export const removeFromCart = shopCart.removeProduct;

//user Recducer
export const getAllUser = user.getAllUser;
export const getUser = user.getUser;
export const editUser = user.editUser;
export const adminUser = user.adminUser;
export const deleteUser = user.deleteUser;