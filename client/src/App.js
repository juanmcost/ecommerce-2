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
};

export default App;
