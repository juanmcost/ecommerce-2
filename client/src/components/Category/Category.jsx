import React, { useEffect, useState } from 'react';
import { SimpleGrid, Box } from '@chakra-ui/react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

import Item from '../../common/Product/Item';
import Spinner from '../../common/Spinner/Spinner';

const Category = () => {
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [tag, setTag] = useState(location.pathname);

    useEffect(() => {
        fetchProducts();
        async function fetchProducts() {
            setTag(location.pathname);
            const res = await axios.get(`/api/product${tag}`);
            if (res.data.length) setProducts(res.data);
        }
    }, []);

    return (
        <SimpleGrid minChildWidth="30%" spacing={6} mt="50" mb="50">
            {products.length ? (
                products.map((elem, i) => <Item key={i} item={elem} />)
            ) : (
                <Box display="flex" flexDirection="column" align="center">
                    <Spinner />
                    {/* <Text mt={'-50px'}>Maybe there are no products...</Text> */}
                </Box>
            )}
        </SimpleGrid>
    );
};

export default Category;
