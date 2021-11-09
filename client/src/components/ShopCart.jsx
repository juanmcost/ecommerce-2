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
        const testCarrito = [{product: {title: "celu", price: 100}, quantity: 2},{product: {title: "monitor", price: 10}, quantity: 1}]
        localStorage.setItem('loggedUser', JSON.stringify(testObject));
        localStorage.setItem('carrito', JSON.stringify(testCarrito));
        //esto si hiría:
        const jsonUser = localStorage.getItem('loggedUser');
        const jsonCart = localStorage.getItem('carrito');
        if (jsonUser) setUser(JSON.parse(jsonUser));
        if (jsonCart) setCart(JSON.parse(jsonCart));
    }, [])
    
    const changeQuantity = (moreOrLess, index) => {
        let auxCart = cart;
        (moreOrLess === "+") ? auxCart[index].quantity+=1 : auxCart[index].quantity-=1;
        //no se me guarda en localStorage
        localStorage.setItem('carrito', JSON.stringify(auxCart));
        setCart(auxCart);
        aux===true ? setAux(false) : setAux(true); //por algun motivo magico, si no hago esto no funciona
    }

    return (
        <>
        <h1>carrito de {user.username}</h1>
        {
        cart.map((prod, i) => (
            <Stack direction={"row"} align="center" h="16" spacing={7} key={i}>
                <p>{prod.product.title}</p>
                <Button onClick={()=>changeQuantity("-", i)}>-</Button>
                <p>Cantidad: {prod.quantity} </p>
                <Button onClick={()=>changeQuantity("+", i)}>+</Button>
                <p>Precio: {prod.product.price}</p>
            </Stack>
        ))}
        </>
    )
}

export default ShopCart