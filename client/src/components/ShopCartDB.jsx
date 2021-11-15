import { useEffect, useState } from "react";
import axios from "axios";
import { Button, useToast } from "@chakra-ui/react";
import { Flex, Stack, Center, Box, Grid } from "@chakra-ui/layout";
import { Link } from "react-router-dom";
import { errorToast } from "../utils/toastMessages";
import { useSelector } from "react-redux";

const ShopCartDB = () => {
    const [cart, setCart] = useState({list: [], total: 0});
    const [aux, setAux] = useState(true);
    const user= useSelector(state => state.user);
    const toast = useToast();
    
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
        } else {
            errorToast(toast, "use the delete button");
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

    const deleteCart = () => {
        axios.delete(`http://localhost:8080/api/cart/${user._id}`)
        .then(() => errorToast(toast, "user cart deleted"))
    }

    return (
        <Flex>
            <Box>
                <h1>carrito de {user.username}</h1>
                {cart.list.map((prod, i) => (
                    <Grid templateColumns="repeat(4, 1fr)" align="center" h="16" key={i}>
                        <Center>
                            {prod.product.title}
                        </Center>
                        <Stack direction={"row"} align="center" spacing={3}>
                            <Button onClick={()=>lessQuantity(i)}>-</Button>

                            <p>Quantity: {prod.quantity} </p>

                            <Button onClick={()=>moreQuantity(i)}>+</Button>
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
            <Button onClick={()=>deleteCart()}>delete cart</Button>
        </Flex>
    )
}

export default ShopCartDB;