import { Button, useToast, Image, Heading, Divider, useColorModeValue, AspectRatio, Text } from '@chakra-ui/react';
import { Flex, Stack, Center, Box, Grid } from '@chakra-ui/layout';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { moreQuantity, lessQuantity, deleteFromCart, deleteCart } from '../../utils/shopCart';
import useShopCart from '../../hooks/useShopCart';

const ShopCart = () => {
    const [aux, setAux] = useState(true);
    const { cart, setCart } = useShopCart();

    const navigate = useNavigate();
    const toast = useToast();

    const itemsBg = useColorModeValue('gray.100', 'gray.900');

    return (
        <>
            <Flex align="center" justify="center">
                <Heading fontSize={'4xl'} m="5">
                    My Cart
                </Heading>
                <Heading ml="auto" fontSize={'2xl'} mr="5">
                    Total: {new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(Number(cart.total))}
                </Heading>
            </Flex>
            <Divider orientation="horizontal" mb="2" />
            {cart.list.length === 0 ? (
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
                                    src={prod.product.img[0]}
                                    alt={prod.product.title}
                                    objectFit="contain"
                                />
                            </AspectRatio>
                            <Center mr="auto">{prod.product.title}</Center>
                            <Stack direction={'row'} align="center" spacing={3}>
                                <Button onClick={() => lessQuantity(i, cart, aux, setCart, setAux, toast)}>-</Button>
                                <p>Quantity: {prod.quantity} </p>
                                <Button onClick={() => moreQuantity(i, cart, aux, setCart, setAux)}>+</Button>
                            </Stack>
                            <Stack align={'center'} justify="center">
                                <Box>{new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(Number(prod.product.price))}</Box>
                                <Button onClick={() => deleteFromCart(i, cart, aux, setCart, setAux)}>
                                    delete product
                                </Button>
                            </Stack>
                        </Grid>
                    ))}
                </Box>
                {cart.list[0] !== undefined ? (
                    <Stack spacing={5} mt="5" mr="5">
                        <Button
                            bg={'green.400'}
                            color={'white'}
                            _hover={{
                                bg: 'green.500',
                            }}
                            onClick={(e) => {
                                e.preventDefault();
                                navigate('/login');
                            }}
                        >
                            proceed with order
                        </Button>
                        <Button onClick={() => deleteCart(aux, setCart, setAux)}>delete cart</Button>
                    </Stack>
                ) : (
                    <></>
                )}
            </Flex>
        </>
    );
};

export default ShopCart;
