import ShopCartDB from "./components/ShopCartDB";
import { NewProduct } from "./containers/NewProduct";
import { ModifyProduct } from "./containers/ModifyProduct";
import React, { useEffect } from "react";
import Home from "./views/Home";
import Navbar from "./components/Navbar";
import { SocialProfileWithImage } from "./components/Card";
import Carousel from "./components/Carousel";
import Login from "./views/Login";
import Register from "./views/Register";
import Profile from "./views/Profile"
import Admin from "./views/Admin.jsx"
import { Route, Routes } from "react-router-dom";
import Article from "./views/Article";
import MyProducts from "./views/MyProducts";
import ShopCart from "./components/ShopCart";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./store/user";
import { dummieData as data } from "./utils/dummieData"
const images = data[4].images //toDo sustituir por info real

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(({user})=>user)
  console.log('useSelector', user)
  useEffect(() => {
    axios.get("/api/auth/me").then((user) => {
      console.log('user app', user)
      if (user.data) dispatch(getUser(user.data[0]));
    });
  }, []);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/articles/:id" element={<Article/>} />
        <Route exact path="/admin" element={<Admin/>} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path='/myProducts' element={<MyProducts />} />
        <Route path="/myCart" element={<ShopCart />} />
        <Route path="/myProducts/newProduct" element={<NewProduct />} />
        <Route path="/myProducts/ModifyProduct/:id" element={<ModifyProduct />} />
        <Route path={`/${user.username}/myCart`} element={<ShopCartDB />} />
        <Route path={`/cart`} element={<ShopCart />} />
        <Route
          path={`/categories/categoryId`}
          element={<>{/* <productsByCategory id={categoryId} /> */}</>}
        />{" "}
      </Routes>
    </div>
  );
};

export default App;
