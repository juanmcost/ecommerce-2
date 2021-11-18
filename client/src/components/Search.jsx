import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProductTitle } from "../store/product"
import { Avatar, Input, Text, Flex, Box  } from "@chakra-ui/react";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from '@choc-ui/chakra-autocomplete';
import axios from "axios"

const Search = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [prod, setProd] = useState([]);
    const [current, setCurrent] = useState({});
    const [press, setPress] = useState('')

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
            const { data } = await axios.get(`/api/product/search/${current}`);
        }
    }, [current]);

    const handlePress = async (event) =>{
        if(event.key == 'Enter'){
            event.preventDefault();
            try {
                await dispatch(getProductTitle(current))
                  .then(() => {
                    navigate('/search_list')
                  })
              } catch (error) {
                console.log({ error });
              }
        }
    }
    return (
    <>
            <Flex ml='10' w='35%'>
                <AutoComplete rollNavigation>
                    <AutoCompleteInput
                        variant="filled"
                        placeholder="Search a product"
                        autoFocus
                        onChange={(e) => setCurrent(e.target.value)}
                        onKeyDown={handlePress}
                    />
                    <AutoCompleteList>
                        {prod ? prod.map((element, oid) => (
                            <AutoCompleteItem
                                key={`option-${oid}`}
                                value={element.title}
                                align="center"
                                onClick={(e)=> navigate(`/articles/${element._id}`)}
                                
                            >
                                <Avatar size="sm" name={element.img[0]} src={element.img[0]} />
                                <Text ml="4">{element.title}</Text>
                            </AutoCompleteItem>
                        )) : null}
                    </AutoCompleteList>
                </AutoComplete>
            </Flex>
        </>
  );
};

export default Search;
