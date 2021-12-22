import React, { useState } from 'react';
import { Text, Box, Flex, Image, Link } from '@chakra-ui/react';
import { Link as ReactLink } from 'react-router-dom';

const Carousel = ({ slides, type }) => {
    const arrowStyles = {
        cursor: 'pointer',
        pos: 'absolute',
        top: '50%',
        w: '35px',
        mt: '-22px',
        p: '8px',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '33px',
        transition: '0.6s ease',
        userSelect: 'none',
        bg: 'rgba(0, 0, 0, 0.85);',
        borderRadius: '10px',
        _hover: {
            bg: 'rgba(0, 0, 0, 0.7);',
        },
    };

    const [currentSlide, setCurrentSlide] = useState(0);

    let total = 0;

    slides &&
        slides.length &&
        slides.map(({ category }) => {
            if ((category && category.includes('samsung')) || type === 'article') {
                return total++;
            }
            return null;
        });

    const prevSlide = () => {
        setCurrentSlide((s) => (s === 0 ? total - 1 : s - 1));
    };
    const nextSlide = () => {
        setCurrentSlide((s) => (s === total - 1 ? 0 : s + 1));
    };

    return (
        <Flex
            w="95vw"
            bg="white"
            alignItems="center"
            m={2}
            justifyContent="center"
            borderRadius={'10px'}
            boxShadow={'lg'}
        >
            <Flex w="full" overflow="hidden" pos="relative">
                <Flex
                    w={(total < 2 && 'full') || (type && '350px') || '470px'}
                    maxH="full"
                    ml={currentSlide > 0 && `-${currentSlide * 50}%`}
                    transition="all 0.5s"
                >
                    {slides &&
                        slides.length &&
                        slides.map((item, sid) => {
                            if (type === 'article') {
                                return (
                                    <Box key={`slide-${sid}`} boxSize={total < 2 ? 'full' : 'full'} flex="none">
                                        <Flex justify="center" h="100%">
                                            <Image src={item} h="100%" backgroundSize="cover" />
                                        </Flex>
                                    </Box>
                                );
                            }
                            if (item.category && item.category.includes('samsung')) {
                                return (
                                    <Box key={`slide-${sid}`} boxSize="full" flex="none" h="95%" mt={2}>
                                        <Link as={ReactLink} to={`/articles/${item._id}`}>
                                            <Flex
                                                justify="center"
                                                w="95%"
                                                h="100%"
                                                direction="column"
                                                borderRadius="10px"
                                                boxShadow="2xl"
                                                align="center"
                                                transition="all 0.4s ease"
                                                _hover={{ transform: 'scale(1.03)', fontSize: '19px' }}
                                            >
                                                <Image src={item.img[0]} h="80%" w="80%" />
                                                <Text color="black" fontWeight={500} fontSize="15px">
                                                    {item.title.length > 43
                                                        ? item.title.substring(0, 43) + ' ...'
                                                        : item.title.substring(0, 43)}
                                                </Text>
                                            </Flex>
                                        </Link>
                                    </Box>
                                );
                            }
                            return null;
                        })}
                </Flex>
                {currentSlide !== 0 || type ? (
                    <Text {...arrowStyles} left="0" onClick={prevSlide} display={total < 2 && 'none'}>
                        &#10094;
                    </Text>
                ) : null}

                {currentSlide < total - 4 || type ? (
                    <Text {...arrowStyles} right="0" onClick={nextSlide} display={total < 2 && 'none'}>
                        &#10095;
                    </Text>
                ) : null}
            </Flex>
        </Flex>
    );
};
export default Carousel;
