import React, { useEffect, useState } from "react";
import { Tbody, Tr, Th, Td } from "@chakra-ui/react";
import axios from "axios";

const OrderProduct = (prop) => {
  const { productId, quantity } = prop.item;
  const [prod, setProd] = useState({});

  useEffect(() => {
    fetchOrders();
    async function fetchOrders() {
      const { data } = await axios.get(`/api/product/${productId}`);
      if (data) setProd(data);
    }
  }, []);

  return (
    <>
      {prod ? (
        <Tbody>
          <Tr>
            <Th>{prod.title}</Th>
            <Td>X{quantity}</Td>
          </Tr>
          <Tr>
            <Td>${prod.price}</Td>
          </Tr>
        </Tbody>
      ) : null}
    </>
  );
};

export default OrderProduct;
