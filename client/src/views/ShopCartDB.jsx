import {
    Button,
    useToast,
    Image,
    Heading,
    Divider,
    useColorModeValue,
    Spinner,
    Text,
    AspectRatio,
} from '@chakra-ui/react';
import { Flex, Stack, Center, Box, Grid } from '@chakra-ui/layout';
import { useNavigate } from 'react-router-dom';

import { moreQuantity, lessQuantity, deleteFromCart, deleteCart } from '../utils/shopCartDb';
import useShopCartDB from '../hooks/useShopCartDB';

const ShopCartDB = () => {
    const { cart, setCart, aux, setAux, showSpinner, order, user } = useShopCartDB();
    const toast = useToast();
    const navigate = useNavigate();
    const itemsBg = useColorModeValue('gray.100', 'gray.900');

    return (
        <>
            <Flex align="center" justify="center">
                <Heading fontSize={'4xl'} m="5">
                    My Cart
                </Heading>
                <Heading ml="auto" fontSize={'2xl'} mr="5">
                    total: $ {order.amount}
                </Heading>
            </Flex>
            <Divider orientation="horizontal" mb="5" />
            {showSpinner ? (
                <Center>
                    <Spinner color="green.300" size="xl" />
                </Center>
            ) : (
                <></>
            )}
            {cart.list.length === 0 && !showSpinner ? (
                <Center>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        no products added
                    </Text>
                </Center>
            ) : (
                <></>
            )}
            <Flex>
                <Box w="full">
                    {cart.list.map((prod, i) => (
                        <Grid templateColumns="repeat(4, 1fr)" align="center" key={i} bg={itemsBg} rounded={'lg'} m="5">
                            <AspectRatio maxW={['200px']} ratio={1} m="5">
                                <Image
                                    rounded={'lg'}
                                    src={prod.product?.img[0]}
                                    alt={prod.product?.title}
                                    objectFit="contain"
                                />
                            </AspectRatio>
                            <Center mr="auto">{prod.product?.title}</Center>
                            <Stack direction={'row'} align="center" spacing={3}>
                                <Button onClick={() => lessQuantity(i, cart, aux, setCart, setAux, toast)}>-</Button>
                                <p>Quantity: {prod.quantity} </p>
                                <Button onClick={() => moreQuantity(i, cart, aux, setCart, setAux)}>+</Button>
                            </Stack>
                            <Stack align="center" justify="center">
                                <Box>$ {prod.product?.price}</Box>
                                <Button onClick={() => deleteFromCart(i, cart, aux, setCart, setAux)}>
                                    Delete product
                                </Button>
                            </Stack>
                        </Grid>
                    ))}
                </Box>
                {cart.list[0] !== undefined ? (
                    <Stack spacing={5} mt="5" mr="5" ml="auto">
                        <Button
                            bg={'green.400'}
                            color={'white'}
                            _hover={{
                                bg: 'green.500',
                            }}
                            onClick={() => navigate('/new_order/address')}
                        >
                            proceed with order
                        </Button>
                        <Button onClick={() => deleteCart(aux, setCart, setAux, user._id, toast)}>Delete cart</Button>
                    </Stack>
                ) : (
                    <></>
                )}
            </Flex>
        </>
    );
};

export default ShopCartDB;
