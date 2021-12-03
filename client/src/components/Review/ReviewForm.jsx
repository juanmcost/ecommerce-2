import {
    Container,
    Flex,
    Box,
    Heading,
    Text,
    Button,
    VStack,
    FormControl,
    FormLabel,
    Textarea,
    useToast,
} from '@chakra-ui/react';
import { addAppreciation, addReview } from '../../store/review';
import Rating from '@material-ui/lab/Rating';
import { errorToast } from '../../utils/toastMessages';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

export default function ReviewForm({ product }) {
    const [appreciation, setAppreciation] = useState('');
    const [review, setReview] = useState('');
    const username = useSelector(({ user: { username } }) => username);

    const toast = useToast();
    const dispatch = useDispatch();

    const handleSubmit = () => {
        if (!username) return errorToast(toast, 'You must be logged in to leave a review.');
        if (review && appreciation) {
            dispatch(
                addReview({
                    id: product._id,
                    review: review,
                    username: username,
                })
            );
            dispatch(
                addAppreciation({
                    id: product._id,
                    appreciation: appreciation,
                })
            );

            setReview('');
            setAppreciation('');
        } else {
            errorToast(toast, 'Make sure to fill all fields.');
        }
    };

    return (
        <Container w="100%" mt={12} centerContent p="0px">
            <Flex w="95vw">
                <Box bg="#1A202C" color="white" borderRadius="lg" p={{ sm: 2, md: 2, lg: 7 }} w="100%">
                    <Box p={4}>
                        <VStack pl={0} spacing={2}>
                            <Box py={{ base: 5, sm: 5, md: 8, lg: 5 }}>
                                <Heading>Review this article</Heading>
                                <Text mt={{ sm: 3, md: 3, lg: 5 }} color="blue.300">
                                    Leave your thoughts on this product down here to help others!
                                </Text>
                            </Box>
                            <Box bg="#F5F5F5" borderRadius="lg" w="95%">
                                <VStack m={8} color="#0B0E3F" spacing={5} align="left">
                                    <Box align="center"></Box>
                                    <FormControl id="review">
                                        <FormLabel>Review</FormLabel>
                                        <Rating
                                            id="rating"
                                            precision={0.1}
                                            name="appreciation"
                                            defaultValue={0}
                                            size="large"
                                            value={appreciation}
                                            onChange={(e) => setAppreciation(e.target.value)}
                                        />
                                        <Textarea
                                            id="review"
                                            name="review"
                                            borderColor="gray.300"
                                            _hover={{ borderRadius: 'gray.300' }}
                                            placeholder="Review"
                                            errorBorderColor="red.500"
                                            isRequired
                                            value={review}
                                            onChange={(e) => setReview(e.target.value)}
                                        />
                                    </FormControl>
                                    <FormControl id="submit" float="right">
                                        <Button
                                            onClick={handleSubmit}
                                            variant="solid"
                                            bg="#1A202C"
                                            color="white"
                                            _hover={{ backgroundColor: '#1C4A5C' }}
                                        >
                                            Submit Review
                                        </Button>
                                    </FormControl>
                                </VStack>
                            </Box>
                        </VStack>
                    </Box>
                </Box>
            </Flex>
        </Container>
    );
}
