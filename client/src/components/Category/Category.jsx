import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import Item from "../Item";
import { SimpleGrid } from "@chakra-ui/react";

const Category = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [tag, setTag] = useState(location.pathname);

  useEffect(() => {
    fetchProducts();
    async function fetchProducts() {
      setTag(location.pathname);
      const { data } = await axios.get(`/api/product${tag}`);
      if (data.length) setProducts(data);
      console.log(products);
    }
  }, []);

  return (
    <SimpleGrid minChildWidth="30%" spacing={6} mt="50" mb="50">
      {products.length ? (
        products.map((elem, i) => <Item key={i} item={elem} />)
      ) : (
        <h1>Not found</h1>
      )}
    </SimpleGrid>
  );
};

export default Category;
