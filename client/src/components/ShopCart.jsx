import { Button, useToast, Image, Heading, Divider, useColorModeValue } from "@chakra-ui/react";
import { Flex, Stack, Center, Box, Grid } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { errorToast } from "../utils/toastMessages";

const ShopCart = () => {
    const [cart,setCart] = useState({list: [], total: 0});
    const [aux, setAux] = useState(true);
    const navigate = useNavigate();
    const toast = useToast();
    const itemsBg = useColorModeValue("gray.100", "gray.900");
    const buttonsBg = useColorModeValue("gray.200");


    useEffect(() => {
        const jsonCart = localStorage.getItem('carrito');
        let carrito = JSON.parse(jsonCart);
        let total = 0;
        console.log("storedCart:",carrito);

        if (carrito === null) {
            carrito = {
                list: [],
                total: 0
            }
            localStorage.setItem('carrito', JSON.stringify(carrito));
        }
        else {
            carrito.list.map((cartItem) => {
                total += cartItem.product.price * cartItem.quantity
            })
        }

        setCart({list: carrito.list, total});
    }, [])
    
    const changeQuantity = (moreOrLess, index) => {
        let auxCart = cart;
        if (moreOrLess === "+") {
            auxCart.list[index].quantity+=1;
            auxCart.total += auxCart.list[index].product.price
        } else {
            if (auxCart.list[index].quantity>1) {
                auxCart.list[index].quantity-=1;
                auxCart.total -= auxCart.list[index].product.price
            } else {
                errorToast(toast, "use the delete button");
            }
        }
        localStorage.setItem('carrito', JSON.stringify(auxCart));
        setCart(auxCart);
        aux===true ? setAux(false) : setAux(true);
    }

    const moreQuantity = (index) => {
        let auxCart = cart;
        auxCart.list[index].quantity+=1;
        auxCart.total += auxCart.list[index].product.price;
        localStorage.setItem('carrito', JSON.stringify(auxCart));
        setCart(auxCart);
        aux===true ? setAux(false) : setAux(true);
    }

    const lessQuantity = (index) => {
        let auxCart = cart;
        if (auxCart.list[index].quantity>1) {
            auxCart.list[index].quantity--;
            auxCart.total -= auxCart.list[index].product.price;
            localStorage.setItem('carrito', JSON.stringify(auxCart));
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
        localStorage.setItem('carrito', JSON.stringify(auxCart));
        setCart(auxCart);
        aux===true ? setAux(false) : setAux(true);
    }

    const deleteCart = () => {
        localStorage.setItem('carrito', null);
        setCart({list: [], total: 0});
        aux===true ? setAux(false) : setAux(true);
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
                            <Button onClick={()=>lessQuantity(i)} >-</Button>
                            <p>Quantity: {prod.quantity} </p>
                            <Button onClick={()=>moreQuantity(i)} >+</Button>
                        </Stack>
                        <Stack align={"center"} justify="center">
                            <Box>$ {prod.product.price}</Box>
                            <Button onClick={()=>deleteFromCart(i)}>delete product</Button>
                        </Stack>
                    </Grid>
                ))}
            </Box>
            {cart.list[0] !== undefined ? 
                (<Stack spacing={5} mt="5" mr="5">
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
                </Stack>)
                :
                <></>
            } 
        </Flex>
        </>
    )
}

export default ShopCart