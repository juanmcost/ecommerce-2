import { SimpleGrid, GridItem } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Item from './Item';
import Spinner from '../common/Admin/Spinner';

const ProductsGrid = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/product/').then((res) => {
            setProducts(res.data.products);
        });
    }, []);

    //if (!products.length) return <Spinner />;

    return (
        <SimpleGrid minChildWidth="30%" spacing={6} mt="50" mb="50">
            {products.map((elem, i) => (
                <Item key={i} item={elem} />
            ))}
        </SimpleGrid>
    );
};

export default ProductsGrid;
