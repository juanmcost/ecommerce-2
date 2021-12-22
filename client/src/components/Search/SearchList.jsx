import { SimpleGrid } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import Item from '../../common/Product/Item';

const SearchList = () => {
    const products = useSelector(({ product }) => product);

    return (
        <SimpleGrid minChildWidth="30%" spacing={6} mt="50" mb="50">
            {products ? products.map((elem, i) => <Item key={i} item={elem} />) : <h1>Not found</h1>}
        </SimpleGrid>
    );
};

export default SearchList;
