import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { getProductTitle } from '../store/product';

const useSearch = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [prod, setProd] = useState([]);
    const [current, setCurrent] = useState({});
    const [width, setWidth] = useState(window.innerWidth);
    const isMobile = width <= 768;

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        };
    }, []);

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        fetchProducts();
        async function fetchProducts() {
            const { data } = await axios.get('/api/product');
            if (data.products.length) setProd(data.products);
        }
    }, []);

    const handlePress = async (event) => {
        if (event.key == 'Enter') {
            event.preventDefault();
            try {
                await dispatch(getProductTitle(current)).then(() => {
                    navigate('/search_list');
                });
            } catch (error) {
                console.log({ error });
            }
        }
    };
    return { width, isMobile, prod, setCurrent, handlePress, handleWindowSizeChange };
};

export default useSearch;
