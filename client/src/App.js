import React from "react";
import Navbar from "./components/Navbar";
import { SocialProfileWithImage } from "./components/Card";
import Carousel from "./components/Carousel";
import  Login  from "./views/Login";
import Register  from "./views/Register"
import { Route, Routes } from "react-router-dom";
import ProductsGrid from "./components/Grid";
import ShopCart from "./components/ShopCart";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Carousel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<SocialProfileWithImage />} />
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
