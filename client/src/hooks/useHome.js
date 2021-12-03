import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { getAllProducts } from '../store/product';

const useHome = () => {
    const user = useSelector(({ user }) => user);
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);

    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

    useEffect(() => {
        const jsonCart = localStorage.getItem('carrito');
        let localCart = JSON.parse(jsonCart);
        if (localCart?.list?.length > 0) setIsOpen(true);
        dispatch(getAllProducts());
        window.addEventListener('scroll', handleScroll, { passive: true });
    }, []);

    useEffect(() => {
        const jsonCart = localStorage.getItem('carrito');
        let localCart = JSON.parse(jsonCart);
        if (localCart?.list?.length > 0) setIsOpen(true);
        dispatch(getAllProducts());
    }, [dispatch]);

    const mergeCart = () => {
        const jsonCart = localStorage.getItem('carrito');
        let { list } = JSON.parse(jsonCart);
        let localCart = [];
        list.map((cartItem) => {
            localCart.push({
                productId: cartItem.product._id,
                quantity: cartItem.quantity,
            });
        });

        axios
            .get(`/api/cart/${user._id}`)
            .then((res) => res.data)
            .then((dbCart) => {
                if (dbCart !== null) {
                    dbCart = dbCart.products;

                    localCart.map((localItem) => {
                        let alreadyIn = false;
                        dbCart.map((dbItem) => {
                            if (dbItem.productId === localItem.productId) {
                                dbItem.quantity += localItem.quantity;
                                alreadyIn = true;
                            }
                        });
                        if (!alreadyIn) dbCart.push({ ...localItem });
                    });

                    axios.put(`/api/cart/${user._id}`, { products: dbCart });
                } else
                    axios.post(`http://localhost:8080/api/cart/`, {
                        products: localCart,
                        userId: user._id,
                    });

                localStorage.setItem('carrito', null);

                setIsOpen(false);
            });
    };
    return { isOpen, setIsOpen, scrollPosition, mergeCart };
};

export default useHome;
