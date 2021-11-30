import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProductTitle } from '../../store/product';
import { Avatar, Text, Flex } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';

import {
    AutoComplete,
    AutoCompleteInput,
    AutoCompleteItem,
    AutoCompleteList,
} from '@choc-ui/chakra-autocomplete';
import axios from 'axios';

const Search = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [prod, setProd] = useState([]);
    const [current, setCurrent] = useState({});
    const [width, setWidth] = useState(window.innerWidth);
    const [ancho, setAncho] = useState('12em');
    const [margin, setMargin] = useState('0');
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

    useEffect(() => {
        fetchProduct();
        async function fetchProduct() {
            const { data } = await axios.get(`/api/product/search/${current}`);
        }
    }, [current]);

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
    return (
        <>
            <Flex mr={margin} w={!isMobile && '10em'} transition="all 0.5s ease">
                <AutoComplete rollNavigation>
                    <AutoCompleteInput
                        variant="filled"
                        placeholder="Search a product..."
                        textAlign={'center'}
                        autoFocus
                        onChange={(e) => setCurrent(e.target.value)}
                        onKeyDown={handlePress}
                        w={ancho}
                        transition="all 0.5s ease"
                        onFocus={() => {
                            setAncho('25em');
                            setMargin('8em');
                        }}
                        onBlur={() => {
                            setAncho('17em');
                            setMargin('0');
                        }}
                    />
                    <AutoCompleteList w={!isMobile && '30em'}>
                        {prod
                            ? prod.map((element, oid) => (
                                  <AutoCompleteItem
                                      key={`option-${oid}`}
                                      value={element.title}
                                      align="center"
                                      onClick={(e) => navigate(`/articles/${element._id}`)}
                                  >
                                      <Avatar size="sm" name={element.img[0]} src={element.img[0]} />
                                      <Text ml="4">{element.title}</Text>
                                  </AutoCompleteItem>
                              ))
                            : null}
                    </AutoCompleteList>
                </AutoComplete>
            </Flex>
        </>
    );
};

export default Search;
