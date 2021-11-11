import { useEffect, useState } from "react";
import axios from "axios";
import { getUser } from "../store/user";
import { useDispatch } from "react-redux";

const ShopCartDB = () => {
    const [cart, setCart] = useState({})
    const dispatch = useDispatch();
    const user = dispatch(getUser());

    useEffect(() => {
        console.log("user:",user);
        axios.get(`http://localhost:8080/api/user/P6c3Y8FFPxYqwTu_DLrdP`)
        .then( res => {
            console.log("here",res.data);
            setCart(res.data)})
        .catch( err => console.log(err.message))
    }, [])
    
    console.log("hola")
    return (
        <>
            <h1>hola</h1>
        </>
    )
}

export default ShopCartDB;