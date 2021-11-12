import { Button, useToast, useColorModeValue } from "@chakra-ui/react";
import { Flex, Stack, Center, Box, Grid } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { errorToast } from "../utils/toastMessages";

const ShopCart = () => {
    const [cart,setCart] = useState({});
    const [aux, setAux] = useState(true);
    const toast = useToast();


    useEffect(() => {
        const jsonCart = localStorage.getItem('carrito');
        let carrito = JSON.parse(jsonCart);
        let total = 0;
        console.log("lista:",carrito);

        if (carrito === null) {
            carrito = {
                list: [//should be empty array
                    {product: {title:"celu", price: 100}, quantity: 2},
                    {product: {title:"monitor", price: 10}, quantity: 1}
                ],
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

    const deleteFromCart = (index) => {
        let auxCart = cart;
        auxCart.total -= auxCart.list[index].product.price * auxCart.list[index].quantity
        auxCart.list.splice(index,1);
        localStorage.setItem('carrito', JSON.stringify(auxCart));
        setCart(auxCart);
        aux===true ? setAux(false) : setAux(true);
    }

    return (
        <Flex>
            <Box>
                {cart?.list?.map((prod, i) => (
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
            <Box>total: {cart?.total}</Box>
            <Link to="/">proceed with order</Link>
        </Flex>
    )
}

export default ShopCart