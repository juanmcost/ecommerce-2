import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Avatar, Text, Flex, Box } from '@chakra-ui/react';
import {
    AutoComplete,
    AutoCompleteInput,
    AutoCompleteItem,
    AutoCompleteList,
} from '@choc-ui/chakra-autocomplete';

const EditProduct = () => {
    // 1- search a product
    // 2- on success => show view
    // 3- on edit success => clear form
    // 4- redirect?

    const [prod, setProd] = useState([]);
    const [current, setCurrent] = useState({});

    useEffect(() => {
        fetchProducts();
        async function fetchProducts() {
            const { data } = await axios.get('/api/product');
            if (data.length) setProd(data);
        }
    }, []);

    useEffect(() => {
        fetchProduct();
        async function fetchProduct() {
            const { data } = await axios.get(`/api/product/admin/${current}`);
            console.log(data);
        }
    }, [current]);

    return (
        <>
            <Flex direction="column" flex="2" margin="0 auto">
                <AutoComplete rollNavigation>
                    <AutoCompleteInput
                        variant="filled"
                        placeholder="Search a product"
                        autoFocus
                        onChange={(e) => setCurrent(e.target.value)}
                    />
                    <AutoCompleteList>
                        {prod.map((element, oid) => (
                            <AutoCompleteItem
                                key={`option-${oid}`}
                                value={element.title}
                                align="center"
                                onClick={(e) => setCurrent(e.target.innerText)}
                            >
                                <Avatar size="sm" name={element.img[0]} src={element.img[0]} />
                                <Text ml="4">{element.title}</Text>
                            </AutoCompleteItem>
                        ))}
                    </AutoCompleteList>
                </AutoComplete>
            </Flex>
        </>
    );
};

export default EditProduct;