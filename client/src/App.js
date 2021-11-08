import React from 'react';
import Navbar from './components/Navbar';
import { SocialProfileWithImage } from './components/card';
import Carousel from './components/Carousel';
import { SimpleCard } from './components/login';
import { Route, Routes } from 'react-router-dom';


const App = () => {
    return (
        <div>
        <Navbar />
        <Routes>
            <Route path = '/home' element = {<Carousel />}/>
            <Route path = '/login' element = {<SimpleCard />} />
            <Route path = '/signIn' element = {<></>} />
            <Route path = '/profile' element = {<SocialProfileWithImage />} />
            <Route path = '/myCart' element = {<></>} />
            <Route path = {`/categories/categoryId`} element = {<>{/* <productsByCategory id={categoryId} /> */}</>} /> //categoryId deberia ser un estado
        </Routes>
        </div>
    );
};

export default App;
