import { useEffect, useState } from "react";


const ShopCart = () => {
    const [user,setUser] = useState({});
    
    useEffect(() => {
        //pa probar:
        const testObject = {username: "ale"}
        localStorage.setItem('loggedUser', JSON.stringify(testObject));
        //esto si hiría:
        const jsonUser = localStorage.getItem('loggedUser');
        if (jsonUser) setUser(JSON.parse(jsonUser))
    }, [])
    
    return (
        <h1>carrito de {user.username}</h1>
    )
}

export default ShopCart