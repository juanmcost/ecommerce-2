import { useEffect, useState } from 'react';
import axios from 'axios';

const useAdminEditProduct = () => {
    const [prod, setProd] = useState([]);
    const [input, setInput] = useState('');
    const [toggle, setToggle] = useState(false);
    const [current, setCurrent] = useState({});

    useEffect(() => {
        fetchProducts();
        async function fetchProducts() {
            try {
                const { data } = await axios.get('/api/product');
                if (data.products.length) return setProd(data.products);
            } catch (error) {
                console.error({ error });
            }
        }
    }, []);

    useEffect(() => {
        input.length >= 3 && fetchProduct();
        async function fetchProduct() {
            setCurrent({});
            setToggle(true);
            try {
                const { data } = await axios.get(`/api/product/admin/${input}`);
                if (data.length) return setCurrent(data[0]);
            } catch (error) {
                console.error({ error });
            }
        }
    }, [input]);

    return { prod, setInput, toggle, current };
};

export default useAdminEditProduct;
