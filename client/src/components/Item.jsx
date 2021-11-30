import { Flex, Circle, Box, Image, useColorModeValue, Icon, Tooltip, Button, useToast } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import Rating from '../components/Rating';
import addToCart from '../utils/addToCart';

function Item({ item }) {
    const user = useSelector(({ user }) => user);
    const toast = useToast();

    return (
        <Flex alignItems="center" justifyContent="center">
            <Box
                bg={useColorModeValue('white', 'gray.800')}
                maxW="250px"
                minH="250px"
                borderWidth="1px"
                rounded="lg"
                shadow="lg"
                position="relative"
                transition="all 0.2s ease-in"
                _hover={{ transform: 'scale(1.03)' }}
            >
                <Link to={`/articles/${item._id}`}>
                    <Image
                        position="relative"
                        src={item.img[0]}
                        minH="250px"
                        maxH="250px"
                        h="250px"
                        w="full"
                        alt={`Picture of ${item.title}`}
                        roundedTop="lg"
                        objectFit="cover"
                    />
                </Link>

                <Box p="6">
                    <Flex mt="1" justifyContent="space-between" alignContent="center">
                        <Link to={`/articles/${item._id}`}>
                            <Box fontSize="0.9rem" fontWeight="500" label="Go to Article">
                                {(item?.title?.length > 33 && item?.title.substring(0, 33) + '...') ||
                                    item?.title.substring(0, 33)}
                            </Box>
                        </Link>
                        <Tooltip label="Add to cart" placement={'top'} fontSize={'1.2em'}>
                            <Button
                                onClick={() => {
                                    addToCart(user, item, toast);
                                }}
                                href={'#'}
                                display={'flex'}
                                bg={useColorModeValue('gray.900', 'teal.300')}
                                color={useColorModeValue('white', 'black')}
                                _hover={{
                                    bg: useColorModeValue('gray.800', 'teal.200'),
                                    color: useColorModeValue('white', 'gray.800'),
                                    transform: 'scale(1.02)',
                                }}
                                transition="all 0.3s ease"
                                opacity="0.9"
                                borderRadius="20px"
                            >
                                <Icon as={FiShoppingCart} h={7} w={7} alignSelf={'center'} />
                            </Button>
                        </Tooltip>
                    </Flex>

                    <Flex justifyContent="space-between" alignContent="center">
                        <Rating rating={item.value} type="home" />
                        <Box fontSize="xl" fontWeight="500" color={useColorModeValue('gray.800', 'white')}>
                            <Box as="span" color={'gray.600'} fontSize="lg">
                                $
                            </Box>
                            {item.price.toFixed(2)}
                        </Box>
                    </Flex>
                </Box>
            </Box>
        </Flex>
    );
}

export default Item;
