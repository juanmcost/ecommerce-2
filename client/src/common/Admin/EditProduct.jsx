import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Avatar, Text, Flex } from '@chakra-ui/react';
import {
    AutoComplete,
    AutoCompleteInput,
    AutoCompleteItem,
    AutoCompleteList,
} from '@choc-ui/chakra-autocomplete';

import NewProduct from './NewProduct';
import Spinner from './Spinner';

const EditProduct = () => {
    const [prod, setProd] = useState([]);
    const [input, setInput] = useState('');
    const [toggle, setToggle] = useState(false);
    const [current, setCurrent] = useState({});

    useEffect(() => {
        fetchProducts();
        async function fetchProducts() {
            try {
                const { data } = await axios.get('/api/product');
                if (data.length) return setProd(data);
                return;
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
                return;
            } catch (error) {
                console.error({ error });
            }
        }
    }, [input]);

    return (
        <>
            <Flex direction="column" flex="2" margin="0 auto" h="100%">
                <AutoComplete rollNavigation>
                    <AutoCompleteInput
                        variant="filled"
                        placeholder="Search a product"
                        autoFocus
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <AutoCompleteList>
                        {prod.map(({ title, img }, i) => (
                            <AutoCompleteItem
                                key={`option-${i}`}
                                value={title}
                                align="center"
                                onClick={(e) => setInput(e.target.innerText)}
                            >
                                <Avatar size="sm" name={img[0]} src={img[0]} />
                                <Text ml="4">{title}</Text>
                            </AutoCompleteItem>
                        ))}
                    </AutoCompleteList>
                </AutoComplete>
                {!current._id && toggle ? <Spinner /> : null}
                {current._id ? <NewProduct article={current} type="edit" art_id={current._id} /> : null}
            </Flex>
        </>
    );
};

export default EditProduct;
