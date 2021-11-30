import Item from './Item';
import { SimpleGrid } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

const ProductsGrid = () => {
    const { products } = useSelector((s) => s.product);

    return (
        <SimpleGrid minChildWidth="270px" spacing={30} mt="50" mb="50">
            {products?.map((elem, i) => (
                <Item key={i} item={elem} />
            ))}
        </SimpleGrid>
    );
};

export default ProductsGrid;
