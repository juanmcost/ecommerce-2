import React from 'react';
import Navbar from './components/Navbar';
import { SocialProfileWithImage } from './components/card';
import Carousel from './components/Carousel';
import { Box } from '@chakra-ui/react';
import { SimpleCard } from './components/login';
const App = () => {
    return (
        <div>
            <Navbar />
            <SocialProfileWithImage />
            <Carousel />
            <SimpleCard />
        </div>
    );
};

export default App;
