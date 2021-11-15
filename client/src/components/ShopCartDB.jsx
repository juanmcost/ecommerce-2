import { useEffect, useState } from "react";
import axios from "axios";
import { Button, useToast, Image, Heading, Divider, useColorModeValue } from "@chakra-ui/react";
import { Flex, Stack, Center, Box, Grid } from "@chakra-ui/layout";
import { Link } from "react-router-dom";
import { errorToast } from "../utils/toastMessages";
import { useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";

const ShopCartDB = () => {
    const [cart, setCart] = useState({list: [], total: 0});
    const [aux, setAux] = useState(true);
    const user= useSelector(state => state.user);
    const toast = useToast();
    const navigate = useNavigate();
    const itemsBg = useColorModeValue("gray.100", "gray.900");
    
    useEffect(() => {
        axios.get(`http://localhost:8080/api/cart/${user._id}`)
        .then( res => {

            if (res.data !== null) {//get array with products id
                let carrito = {list: [], total: 0}

                res.data.products.map((cartItem, i) => {//change id to real product and sum total price
                    axios.get(`http://localhost:8080/api/product/${res.data.products[i].productId}`)
                    .then(res => res.data)
                    .then(item => {
                        carrito.list.push({product: item, quantity: cartItem.quantity});
                        carrito.total += item.price * cartItem.quantity;
                        return carrito
                    })
                    .then(carrito => {
                        setCart({...carrito})
                    })
                });
            }

        })
        .catch(err => console.log(err))

    }, [])

    useEffect(() => {
        if (cart.list[0] !== undefined) {
            const products = []
            cart.list.map((cartItem) =>{
                products.push({productId: cartItem.product._id, quantity: cartItem.quantity})
            })
            return axios.put(`http://localhost:8080/api/cart/${user._id}`, {products})
        }
    }, [aux])

    const moreQuantity = (index) => {
        let auxCart = cart;
        auxCart.list[index].quantity+=1;
        auxCart.total += auxCart.list[index].product.price
        setCart(auxCart);
        aux===true ? setAux(false) : setAux(true);
    }

    const lessQuantity = (index) => {
        let auxCart = cart;
        if (auxCart.list[index].quantity>1) {
            auxCart.list[index].quantity--;
            auxCart.total -= auxCart.list[index].product.price
            setCart(auxCart);
            aux===true ? setAux(false) : setAux(true);
        } else {
            errorToast(toast, "use the delete button");
        }
    }

    const deleteFromCart = (index) => {
        let auxCart = cart;
        auxCart.total -= auxCart.list[index].product.price * auxCart.list[index].quantity
        auxCart.list.splice(index,1);
        setCart(auxCart);
        aux===true ? setAux(false) : setAux(true);
    }

    const deleteCart = () => {
        axios.delete(`http://localhost:8080/api/cart/${user._id}`)
        .then(() => errorToast(toast, "user cart deleted"))
    }

    return (
        <>
        <Flex align="center" justify="center">
            <Heading fontSize={"4xl"} m="5">My Cart</Heading>
            <Heading ml="auto" fontSize={"2xl"} mr="5">total: $ {cart.total}</Heading>   
        </Flex>
            <Divider orientation="horizontal" mb="5" />
        <Flex>
            <Box>
                {cart.list.map((prod, i) => (
                    <Grid templateColumns="repeat(3, 1fr)" align="center" key={i} bg={itemsBg} rounded={"lg"} m="5">
                        <Stack direction="row" align="center" mr="5">
                            <Center m="3">
                                <Image
                                boxSize="80%"
                                rounded={"lg"}
                                src={prod.product.img[0]}
                                alt={prod.product.title}
                                />
                            </Center>
                            <Center>{prod.product.title}</Center>
                        </Stack>
                        <Stack direction={"row"} align="center" spacing={3}>
                            <Button onClick={()=>lessQuantity(i)}>-</Button>
                            <p>Quantity: {prod.quantity} </p>
                            <Button onClick={()=>moreQuantity(i)}>+</Button>
                        </Stack>
                        <Stack align={"center"} justify="center">
                            <Box>$ {prod.product.price}</Box>
                            <Button onClick={()=>deleteFromCart(i)}>delete product</Button>
                        </Stack>
                    </Grid>
                ))}
            </Box>
            <Stack spacing={5} mt="5" mr="5">
                <Button
                bg={"green.400"}
                color={"white"}
                _hover={{
                    bg: "green.500",
                }}
                onClick={(e)=> {e.preventDefault(); navigate('/new_order/address')} }
                >
                proceed with order
                </Button>
                <Button onClick={()=>deleteCart()}>delete cart</Button>
            </Stack>
        </Flex>
        </>
    )
}

export default ShopCartDB;