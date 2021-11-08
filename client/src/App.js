<<<<<<< HEAD
import React from 'react';
import Navbar from './components/Navbar';
import { SocialProfileWithImage } from './components/card';
import Carousel from './components/Carousel';
import { Box } from '@chakra-ui/react';
import { SimpleCard } from './components/login';
import Article from './views/Article';
import { BrowserRouter, Routes, Route } from 'react-router-dom';        //todo BORRAR ANTES DE PUSHEAR
const App = () => {
    return (
        <div>
            <BrowserRouter>
                    <Navbar />
                <Routes>
                    <Route path ='/' element={[ <SocialProfileWithImage />, <Carousel />, <SimpleCard /> ]}/>
                    <Route path='/articles/:id' element={<Article />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
=======
import React from "react";
import Navbar from "./components/Navbar";
import { SocialProfileWithImage } from "./components/Card";
import Carousel from "./components/Carousel";
import { SimpleCard } from "./components/login";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Carousel />} />
        <Route path="/login" element={<SimpleCard />} />
        <Route path="/signIn" element={<></>} />
        <Route path="/profile" element={<SocialProfileWithImage />} />
        <Route path="/myCart" element={<></>} />
        <Route
          path={`/categories/categoryId`}
          element={<>{/* <productsByCategory id={categoryId} /> */}</>}
        />{" "}
        //categoryId deberia ser un estado
      </Routes>
    </div>
  );
>>>>>>> edd58f0013182f559987244cb52be7531d92fe2e
};

export default App;
