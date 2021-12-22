import { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';

import { errorToast, successToast } from '../utils/toastMessages.js';

const useAdminRemoveProduct = () => {
    const [products, setProducts] = useState([]);
    const [input, setInput] = useState('');
    const toast = useToast();

    const _handleDelete = async (id) => {
        try {
            const { status } = await axios.delete(`/api/product/${id}`);
            if (status === 204) successToast(toast, 'Deleted product', 'Operation completed successfully');
        } catch (error) {
            errorToast(toast, 'Error at Delete');
        }
    };

    useEffect(() => axios.get('/api/product').then(({ data }) => setProducts(data.products)), []);

    useEffect(() => axios.get(`/api/product/search/${input}`).then(({ data }) => setProducts(data)), [input]);
    return { products, setProducts, input, setInput, _handleDelete };
};

export default useAdminRemoveProduct;
