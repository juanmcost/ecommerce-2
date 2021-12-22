import {
    Button,
    useToast,
    Image,
    Heading,
    Divider,
    useColorModeValue,
    Spinner,
    Text,
    AspectRatio,
} from '@chakra-ui/react';
import { Flex, Stack, Center, Box, Grid } from '@chakra-ui/layout';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import { moreQuantity, lessQuantity, deleteFromCart, deleteCart } from '../utils/shopCartDb';

const useShopCartDB = () => {
    const [cart, setCart] = useState({list: [], total: 0});
    const [aux, setAux] = useState(true);
    const [showSpinner, setShowSpinner] = useState(true);
    const user = useSelector(state => state.user);
    const toast = useToast();
    const isMounted = useRef(false);
    
    useEffect(() => {
        console.log("useEffect")
        axios.get(`/api/cart/${user._id}`)
        .then(res => res.data )
        .then( dbCart => {
            if (dbCart !== null) {
                console.log("this arrived", dbCart);
                setCart({...dbCart})}
            setShowSpinner(false);
        })
        .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        if (isMounted.current) {
            if (cart.list.length > 0) {
                return axios.put(`/api/cart/${user._id}`, {newCart: cart})
            }
            else deleteCart(aux, setCart, false, user._id, toast)
        }
        else {isMounted.current = true};
    }, [aux])

    return { cart, setCart, aux, setAux, showSpinner, user, isMounted };
};

export default useShopCartDB;
