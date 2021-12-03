import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import { toastDelete, toastAdd } from '../utils/toastMessages.js';

const useAdminNewProduct = (article, art_id, type) => {
    const user = useSelector(({ user }) => user);
    const toast = useToast();

    const [img, setImg] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState(0);
    const [color, setColor] = useState('');

    const newProduct = {
        title,
        description,
        img,
        category: category.split(' '),
        price: Number(price),
        color,
    };

    const _handleSubmit = async (newProduct) => {
        try {
            //Check if the product already exist
            const { data } = await axios.get(`/api/product/admin/${title}`);
            if (data.length) return toastDelete(toast, 'Error at create!');

            //if not exist
            const res = await axios.post('/api/product/add', newProduct);
            return res.status === 201 ? toastAdd(toast, 'Success at create!') : toastDelete(toast, 'Error at create!');
        } catch (err) {
            toastDelete(toast, 'Error at create!');
        }
    };

    const _handleEdit = async (product) => {
        try {
            const res = await axios.put(`/api/product/${art_id}`, product);
            return res.status === 200 ? toastAdd(toast, 'Success at edit!') : toastDelete(toast, 'Error at edit!');
        } catch (err) {
            toastDelete(toast, 'Error at edit!');
        }
    };

    useEffect(() => {
        setImg((type && article.img[0]) || '');
        setTitle((type && article.title) || '');
        setDescription((type && article.description) || '');
        setCategory((type && article.category.join(' ')) || '');
        setPrice((type && article.price) || 0);
        setColor((type && article.color) || '');

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [article]);

    return {
        user,
        newProduct,
        color,
        setColor,
        price,
        setPrice,
        category,
        setCategory,
        img,
        setImg,
        title,
        setTitle,
        description,
        setDescription,
        _handleEdit,
        _handleSubmit,
    };
};

export default useAdminNewProduct;
