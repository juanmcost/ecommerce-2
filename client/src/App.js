import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import { SocialProfileWithImage } from "./components/Card";
import Carousel from "./components/Carousel";
import Login from "./views/Login";
import Register from "./views/Register";
import { Route, Routes } from "react-router-dom";
import Article from "./views/Article";
import MyProducts from "./views/MyProducts";
import ProductsGrid from "./components/Grid";
import ShopCart from "./components/ShopCart";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./store/user";

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
        <Route path="/articles/:id" element={<Article />} />
        <Route path="/home" element={<Carousel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<SocialProfileWithImage />} />
        <Route path="/myCart" element={<></>} />
        <Route path="/myProducts" element={<MyProducts />} />
        <Route path="/myCart" element={<ShopCart />} />
        <Route
          path={`/categories/categoryId`}
          element={<>{/* <productsByCategory id={categoryId} /> */}</>}
        />{" "}
      </Routes>
    </div>
  );
};

export default App;
