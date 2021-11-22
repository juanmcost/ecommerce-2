import React, { useEffect, useState } from "react";
import OrderList from "./OrderList";
import axios from "axios";
import {
  Box,
  Flex,
  Heading,
  Stack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  useColorModeValue,
} from "@chakra-ui/react";

const OrderHistory = () => {
  const [order, setOrder] = useState([]);
  
  useEffect(() => {
    fetchOrders();
    async function fetchOrders() {
      const { data } = await axios.get("/api/order/history");
      if (data.length) setOrder(data);
    }
  }, []);
  
  console.log(order)
  
  return (
    <div>
      <Flex align={"center"} justify={"center"}>
        <Stack spacing={8} maxW={900} py={12}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>My Orders</Heading>
            <Box
              rounded={"lg"}
              w={600}
              m={20}
              bg={useColorModeValue("white", "gray.600")}
              boxShadow={"lg"}
              p={8}
            >
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Order</Th>
                    <Th >Amount</Th>
                    <Th isNumeric>Date</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {order
                    ? order.map((elem, i) => <OrderList key={i} item={elem} />)
                    : null}
                </Tbody>
              </Table>
            </Box>
          </Stack>
        </Stack>
      </Flex>
    </div>
  );
};

export default OrderHistory;