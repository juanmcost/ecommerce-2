import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {   useColorModeValue, InputGroup, Input, InputLeftElement } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import {getProductTitle} from '../store/product'


const Search = () => {

    const dispatch = useDispatch();
    const handleSearch = (e) => {
        console.log('event', e.target.value)
      dispatch(getProductTitle(e.target.value))
        .then(( {payload} ) => console.log('payload', payload))
        .catch("err");
    };

    return (
    <InputGroup ml="10" w="35%">
      <InputLeftElement
        pointerEvents="none"
        children={<FaSearch color="gray.300" />}
      />
      <Input
        bg={useColorModeValue("gray.50", "gray.700")}
        type="tel"
        placeholder="Search some products!"
        onChange={handleSearch}
      />
    </InputGroup>
  );
};

export default Search;
