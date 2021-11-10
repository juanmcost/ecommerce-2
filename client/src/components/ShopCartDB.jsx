import { useEffect, useState } from "react";
import axios from "axios";

const ShopCartDB = () => {
    const [cart, setCart] = useState({})

    useEffect(() => {
        axios.get('http://localhost:8080/api/cart/:id')
        .then( res => setCart(res.data))
        .catch( err => console.log(err.message))
    }, [])
    
    
    return (
        <>

        </>
    )
}