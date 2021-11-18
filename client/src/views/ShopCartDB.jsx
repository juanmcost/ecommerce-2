import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Button, useToast, Image, Heading, Divider, useColorModeValue, Spinner, Text, AspectRatio } from "@chakra-ui/react";
import { Flex, Stack, Center, Box, Grid } from "@chakra-ui/layout";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";
import { moreQuantity, lessQuantity, deleteFromCart, deleteCart } from "../utils/shopCartDb";
import { setAmount } from "../store/order";

const ShopCartDB = () => {
    const [cart, setCart] = useState({list: [], total: 0});
    const [aux, setAux] = useState(true);
    const [showSpinner, setShowSpinner] = useState(true);
    const user = useSelector(state => state.user);
    const order = useSelector(state => state.order);
    const toast = useToast();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const itemsBg = useColorModeValue("gray.100", "gray.900");
    const isMounted = useRef(false);
    
    useEffect(() => {
        axios.get(`/api/cart/${user._id}`)
        .then( res => {
            if (res.data?.products.length === 0) {
                console.log("oh no!! empty array was stored!");
                axios.delete(`http://localhost:8080/api/cart/${user._Id}`);
                res.data = null;
            }

            if (res.data !== null) {//get array with products id
                let carrito = {list: [], total: 0}
                console.log("it wasnt null", res.data);

                res.data.products.map((cartItem, i) => {//change id to real product and sum total price
                    axios.get(`/api/product/${res.data.products[i].productId}`)
                    .then(res => res.data)
                    .then(item => {
                        setShowSpinner(false);
                        carrito?.list.push({product: item, quantity: cartItem.quantity});
                        carrito.total += item?.price * cartItem.quantity;
                        return carrito
                    })
                    .then(carrito => {
                        setCart({...carrito})
                        dispatch(setAmount(carrito.total || 0));
                    })
                });
            }
            else setShowSpinner(false);
        })
        .catch(err => console.log(err))

    }, [])

    useEffect(() => {
        if (isMounted.current) {
            const products = []
            dispatch(setAmount(cart.total || 0));
            if (cart.list.length > 0) {
                cart.list.map((cartItem) =>{
                    products.push({productId: cartItem.product._id, quantity: cartItem.quantity})
                })
                return axios.put(`/api/cart/${user._id}`, {products})
            }
            else deleteCart(aux, setCart, false, user._id, toast)
        }
        else {isMounted.current = true};
    }, [aux])

    return (
        <>
        <Flex align="center" justify="center">
            <Heading fontSize={"4xl"} m="5">My Cart</Heading>
            <Heading ml="auto" fontSize={"2xl"} mr="5">total: $ {order.amount}</Heading>
        </Flex>
            <Divider orientation="horizontal" mb="5" />
                {showSpinner?<Center><Spinner color="green.300" size="xl"/></Center>: <></>}
                {cart.list.length===0 && !showSpinner? <Center><Text fontSize={"lg"} color={"gray.600"}>no products added</Text></Center>:<></> }
        <Flex>
            <Box w="full">
                {cart.list.map((prod, i) => (
                    <Grid templateColumns="repeat(4, 1fr)" align="center" key={i} bg={itemsBg} rounded={"lg"} m="5">
                        <AspectRatio maxW={["200px"]} ratio={1} m="5">
                            <Image
                            rounded={"lg"}
                            src={prod.product?.img[0]}
                            alt={prod.product?.title}
                            objectFit="contain"
                            />
                        </AspectRatio>
                        <Center mr="auto">{prod.product?.title}</Center>
                        <Stack direction={"row"} align="center" spacing={3}>
                            <Button onClick={()=>lessQuantity(i, cart, aux, setCart, setAux, toast)}>-</Button>
                            <p>Quantity: {prod.quantity} </p>
                            <Button onClick={()=>moreQuantity(i, cart, aux, setCart, setAux)}>+</Button>
                        </Stack>
                        <Stack align="center" justify="center">
                            <Box>$ {prod.product?.price}</Box>
                            <Button onClick={()=>deleteFromCart(i, cart, aux, setCart, setAux)}>Delete product</Button>
                        </Stack>
                    </Grid>
                ))}
            </Box>
            {cart.list[0] !== undefined ? 
                <Stack spacing={5} mt="5" mr="5" ml="auto">
                    <Button
                    bg={"green.400"}
                    color={"white"}
                    _hover={{
                        bg: "green.500",
                    }}
                    onClick={() => navigate("/new_order/address")}
                    >
                    proceed with order
                    </Button>
                    <Button onClick={()=>deleteCart(aux, setCart, setAux, user._id, toast)}>Delete cart</Button>
                </Stack>
                :
                <></>
            }
        </Flex>
        </>
    )
}

export default ShopCartDB;