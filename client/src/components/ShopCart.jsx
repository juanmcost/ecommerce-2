import { Button } from "@chakra-ui/react";
import { Flex, Stack } from "@chakra-ui/layout";
import { useEffect, useState } from "react";


const ShopCart = () => {
    const [user,setUser] = useState({});
    const [cart,setCart] = useState([]);
    const [aux, setAux] = useState(true);


    useEffect(() => {
        //pa probar:
        const testObject = {username: "ale"}
        const testCarrito = {
            list: [{product: {title: "celu", price: 100}, quantity: 2},{product: {title: "monitor", price: 10}, quantity: 1}],
            total: 0
        }
        localStorage.setItem('loggedUser', JSON.stringify(testObject));
        localStorage.setItem('carrito', JSON.stringify(testCarrito));
        //esto si hiría:
        const jsonUser = localStorage.getItem('loggedUser');
        const jsonCart = localStorage.getItem('carrito');
        let carrito = JSON.parse(jsonCart);
        console.log("carrito:",carrito);
        carrito.list.map((cartItem, i) => {
            carrito.total += cartItem.product.price * cartItem.quantity
        })
        console.log("total de carrito:", carrito.total)
        if (jsonUser) setUser(JSON.parse(jsonUser));
        if (jsonCart) setCart(carrito);
        console.log("")
    }, [])
    
    const changeQuantity = (moreOrLess, index) => {
        let auxCart = cart;
        if (moreOrLess === "+") {
            auxCart.list[index].quantity+=1;
            auxCart.total += auxCart.list[index].product.price
        } else {
            auxCart.list[index].quantity-=1;
            auxCart.total -= auxCart.list[index].product.price
        }
        //no se me guarda en localStorage
        localStorage.setItem('carrito', JSON.stringify(auxCart));
        setCart(auxCart);
        aux===true ? setAux(false) : setAux(true); //por algun motivo magico, si no hago esto no funciona
    }

    return (
        <>
        <h1>carrito de {user.username}</h1>
        {
        cart.list?.map((prod, i) => (
            <Stack direction={"row"} align="center" h="16" spacing={7} key={i}>
                <p>{prod.product.title}</p>
                <Button onClick={()=>changeQuantity("-", i)}>-</Button>
                <p>Quantity: {prod.quantity} </p>
                <Button onClick={()=>changeQuantity("+", i)}>+</Button>
                <p>Price: {prod.product.price}</p>
            </Stack>
        ))}
        <h1>total: {cart.total}</h1>
        </>
    )
}

export default ShopCart