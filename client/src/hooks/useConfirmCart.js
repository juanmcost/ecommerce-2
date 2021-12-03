import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { setStatus } from '../store/order';
import { setProducts } from '../store/order';
import { resetOrder } from '../store/order';

const useConfirmCart = (id, token) => {
    const order = useSelector(({ order }) => order);
    const dispatch = useDispatch();
    const [state, setState] = useState('empty');

    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/order/confirm/${id}/${token}`)
            .then((res) => res.data)
            .then((cart) => {
                dispatch(setProducts(cart.products));
                dispatch(setStatus('confirmed'));
            })
            .then(() => {
                console.log('this is order', order);
                axios
                    .post('/api/order/add', { ...order })
                    .then(() => {
                        dispatch(resetOrder());
                        axios.delete(`http://localhost:8080/api/cart/${id}`);
                        setState('confirmed');
                    })
                    .catch(() => {
                        dispatch(resetOrder());
                        setState('error');
                    });
            })
            .catch(() => {
                dispatch(resetOrder());
                setState('error');
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { state };
};

export default useConfirmCart;
