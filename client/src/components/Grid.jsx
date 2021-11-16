import { SimpleGrid, GridItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Item from "./Item";
import { Link } from "react-router-dom";

const ProductsGrid = () => {
  const res = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];

    useEffect(() => {
        axios.get("http://localhost:8080/api/product/")
        .then(res => {
            setProducts(res.data)});
    }, [])

    return (
        <SimpleGrid minChildWidth="30%"  spacing={6} mt="50" mb="50">
            {products.map(elem => (
                <Item item={elem}/>
            ))}
        </SimpleGrid>
    )
}

  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
      {products.map((elem) => (
        <GridItem>
          <Item item={elem} />
        </GridItem>
      ))}
    </SimpleGrid>
  );
};

export default ProductsGrid;
