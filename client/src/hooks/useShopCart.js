import { useEffect, useState } from 'react';

const useShopCart = () => {
    const [cart, setCart] = useState({ list: [], total: 0 });

    useEffect(() => {
        const jsonCart = localStorage.getItem('carrito');
        let carrito = JSON.parse(jsonCart);
        let total = 0;

        if (carrito === null) {
            carrito = {
                list: [],
                total: 0,
            };
            localStorage.setItem('carrito', JSON.stringify(carrito));
        } else {
            carrito.list.map((cartItem) => {
                total += cartItem.product.price * cartItem.quantity;
                return null;
            });
        }

        setCart({ list: carrito.list, total });
    }, []);

    return { cart, setCart };
};

export default useShopCart;
