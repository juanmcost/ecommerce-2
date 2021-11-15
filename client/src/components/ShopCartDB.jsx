import { useEffect, useState } from "react";
import axios from "axios";
import { Button, useToast, useColorModeValue } from "@chakra-ui/react";
import { Flex, Stack, Center, Box, Grid } from "@chakra-ui/layout";
import { Link } from "react-router-dom";
import { errorToast } from "../utils/toastMessages";
import { useSelector } from "react-redux";


const ShopCartDB = () => {
    const [cart, setCart] = useState({list: [], total: 0});
    const [aux, setAux] = useState(true);
    const user= useSelector((state) => state.user);
    const toast = useToast();

    useEffect(() => {
        axios.get(`http://localhost:8080/api/cart/${user._id}`)
        .then( res => {
            let carrito = []
            if (res.data !== null) carrito = res.data.products;
            return carrito
        })
        .then(carrito => {
            let total = 0;

            carrito.map((cartItem, i) => {
                total += cartItem.product.price * cartItem.quantity
            });
            
            setCart({list: carrito, total})
        })
        .catch(err => console.log(err))

    }, [])

    useEffect(() => {
        if (cart.list == []){
            const product = cart.list
            axios.put(`http://localhost:8080/api/cart/${user._id}`, {product})
        }
    }, [aux])

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
        setCart(auxCart);
        aux===true ? setAux(false) : setAux(true);
    }

    const deleteFromCart = (index) => {
        let auxCart = cart;
        auxCart.total -= auxCart.list[index].product.price * auxCart.list[index].quantity
        auxCart.list.splice(index,1);
        setCart(auxCart);
        aux===true ? setAux(false) : setAux(true);
    }

    return (
        <Flex>
            <Box>
                <h1>carrito de {user.username}</h1>
                {cart.list.map((prod, i) => (
                    <Grid templateColumns="repeat(4, 1fr)" align="center" h="16">
                        <Center>
                            {prod.product.title}
                        </Center>
                        <Stack direction={"row"} align="center" spacing={3}>
                            <Button onClick={()=>changeQuantity("-", i)}>-</Button>

                            <p>Quantity: {prod.quantity} </p>

                            <Button onClick={()=>changeQuantity("+", i)}>+</Button>
                        </Stack>
                        <Center>
                            Price: {prod.product.price}
                        </Center>
                        <Center>
                            <Button onClick={()=>deleteFromCart(i)}>delete product</Button>
                        </Center>
                    </Grid>
                ))}
            </Box>
            <Box>total: {cart.total}</Box>
            <Link to="/">proceed with order</Link>
        </Flex>
    )
}

export default ShopCartDB;