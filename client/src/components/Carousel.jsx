import React, { useState } from 'react';
import { Text, Box, Flex, Image } from '@chakra-ui/react';

const Carousel = ({ slides }) => {
    const arrowStyles = {
        cursor: 'pointer',
        pos: 'absolute',
        top: '50%',
        w: '50px',
        mt: '-22px',
        p: '16px',
        color: 'black',
        fontWeight: 'bold',
        fontSize: '33px',
        transition: '0.6s ease',
        borderRadius: '0 3px 3px 0',
        userSelect: 'none',
        _hover: {
            opacity: 0.8,
            bg: 'gray.500',
        },
    };

    const [currentSlide, setCurrentSlide] = useState(0);

    let total = 0;

    const a = slides?.map((e) => {
        if (e.category.includes('samsung')) {
            total = total + 1;
        }
    }).length;

    const prevSlide = () => {
        setCurrentSlide((s) => (s === 0 ? total - 1 : s - 1));
    };
    const nextSlide = () => {
        setCurrentSlide((s) => (s === total - 1 ? 0 : s + 1));
    };

    const carouselStyle = {
        transition: 'all .5s',
        ml: `{currentSlide > 0 && -${currentSlide * 50}% } `,
    };

    return (
        <Flex w="100vw" bg="white" alignItems="center" p={5} justifyContent="center">
            <Flex w="full" overflow="hidden" pos="relative">
                <Flex
                    h="full"
                    w="470px"
                    ml={currentSlide > 0 && `-${currentSlide * 50}%`}
                    transition="all 0.5s"
                >
                    {slides?.map(({ img, category }, sid) => {
                        if (category.includes('samsung')) {
                            return (
                                <Box key={`slide-${sid}`} boxSize="full" flex="none">
                                    <Flex justify="center" h="100%">
                                        <Image src={img[0]} h="100%" backgroundSize="cover" />
                                    </Flex>
                                </Box>
                            );
                        }
                        return null;
                    })}
                </Flex>
                {currentSlide !== 0 && (
                    <Text {...arrowStyles} left="0" onClick={prevSlide}>
                        &#10094;
                    </Text>
                )}
                {currentSlide < total - 2 && (
                    <Text {...arrowStyles} right="0" onClick={nextSlide}>
                        &#10095; {console.log(currentSlide, '', total)}
                    </Text>
                )}
            </Flex>
        </Flex>
    );
};
export default Carousel;
