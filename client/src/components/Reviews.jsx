import { Box, chakra, Container, Flex, SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react';
import ReviewCard from './ReviewCard';
import ReviewForm from './ReviewForm';
import { useSelector } from 'react-redux';

export default function Reviews({ product }) {
    const newReviews = useSelector(({ review }) => review.reviews);
    const reviews = product.reviews;

    return (
        <Container maxW="100%">
            <Flex textAlign={'center'} pt={10} justifyContent={'center'} flexDir="column" width={'full'}>
                <Box width={{ base: 'full', sm: 'lg', lg: 'xl' }} margin={'auto'}>
                    <chakra.h3
                        fontFamily={'Work Sans'}
                        fontWeight={'bold'}
                        fontSize={20}
                        textTransform={'uppercase'}
                        color={'purple.400'}
                    >
                        Do you need
                    </chakra.h3>
                    <chakra.h1
                        py={5}
                        fontSize={48}
                        fontFamily={'Work Sans'}
                        fontWeight={'bold'}
                        color={useColorModeValue('gray.700', 'gray.50')}
                    >
                        More info?
                    </chakra.h1>
                    <chakra.h2
                        margin={'auto'}
                        width={'70%'}
                        fontFamily={'Inter'}
                        fontWeight={'medium'}
                        color={useColorModeValue('gray.500', 'gray.400')}
                    >
                        You don't have to trust just like that, make a better decision after watching what other
                        customers think!
                    </chakra.h2>
                </Box>
                {reviews ? (
                    <SimpleGrid columns={{ base: 1, xl: 2 }} spacing={'20'} mt={16} mx={'auto'}>
                        {!newReviews
                            ? reviews.map((cardInfo, index) => <ReviewCard {...cardInfo} key={index} index={index} />)
                            : newReviews.map((cardInfo, index) => (
                                  <ReviewCard {...cardInfo} key={index} index={index} />
                              ))}
                    </SimpleGrid>
                ) : (
                    <Text p="5vw">Oops! There are no reviews for this product yet.</Text>
                )}

                <ReviewForm product={product} />
            </Flex>
        </Container>
    );
}
