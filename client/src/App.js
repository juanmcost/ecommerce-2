import React from "react";
import Navbar from "./components/Navbar";
import { SocialProfileWithImage } from "./components/Card";
import Carousel from "./components/Carousel";
import { SimpleCard } from "./components/Login";
import { Route, Routes } from "react-router-dom";
import ProductsGrid from "./components/Grid";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Carousel />} />
        <Route path="/login" element={<SimpleCard />} />
        <Route path="/signIn" element={<></>} />
        <Route path="/profile" element={<SocialProfileWithImage />} />
        <Route path="/myCart" element={<ProductsGrid/>} />
        <Route
          path={`/categories/categoryId`}
          element={<>{/* <productsByCategory id={categoryId} /> */}</>}
        />{" "}
      </Routes>
    </div>
  );
};

export default App;
