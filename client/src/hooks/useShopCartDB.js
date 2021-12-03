import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteCart } from '../utils/shopCartDb';
import { setAmount } from '../store/order';

const useShopCartDB = () => {
    const [cart, setCart] = useState({ list: [], total: 0 });
    const [aux, setAux] = useState(true);
    const [showSpinner, setShowSpinner] = useState(true);
    const user = useSelector((state) => state.user);
    const order = useSelector((state) => state.order);
    const toast = useToast();
    const dispatch = useDispatch();
    const isMounted = useRef(false);

    useEffect(() => {
        axios
            .get(`/api/cart/${user._id}`)
            .then((res) => {
                if (res.data?.products.length === 0) {
                    axios.delete(`http://localhost:8080/api/cart/${user._Id}`);
                    res.data = null;
                }

                if (res.data !== null) {
                    //get array with products id
                    let carrito = { list: [], total: 0 };

                    res.data.products.map((cartItem, i) => {
                        //change id to real product and sum total price
                        axios
                            .get(`/api/product/${res.data.products[i].productId}`)
                            .then((res) => res.data)
                            .then((item) => {
                                setShowSpinner(false);
                                carrito?.list.push({ product: item, quantity: cartItem.quantity });
                                carrito.total += item?.price * cartItem.quantity;
                                return carrito;
                            })
                            .then((carrito) => {
                                setCart({ ...carrito });
                                dispatch(setAmount(carrito.total || 0));
                            });
                    });
                } else setShowSpinner(false);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        if (isMounted.current) {
            const products = [];
            dispatch(setAmount(cart.total || 0));
            if (cart.list.length > 0) {
                cart.list.map((cartItem) => {
                    products.push({ productId: cartItem.product._id, quantity: cartItem.quantity });
                });
                return axios.put(`/api/cart/${user._id}`, { products });
            } else deleteCart(aux, setCart, false, user._id, toast);
        } else {
            isMounted.current = true;
        }
    }, [aux]);

    return { cart, setCart, aux, setAux, showSpinner, order, user, isMounted };
};

export default useShopCartDB;
