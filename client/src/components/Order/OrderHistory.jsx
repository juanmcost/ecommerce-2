import React, { useEffect, useState } from "react";
import OrderList from "./OrderList";
import axios from "axios";
import { Flex, Heading, Stack } from "@chakra-ui/react";

const OrderHistory = () => {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    fetchOrders();
    async function fetchOrders() {
      const { data } = await axios.get("/api/order/history");
      console.log("datazo", data);
      if (data.length) setOrder(data);
    }
  }, []);
  console.log(`order`, order);
  return (
    <div>
      <Flex align={"center"} justify={"center"}>
        <Stack spacing={8} maxW={900} py={12}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>My Orders</Heading>
          </Stack>
          {order
            ? order.map((elem, i) => <OrderList key={i} item={elem} />)
            : null}
        </Stack>
      </Flex>
    </div>
  );
};

export default OrderHistory;
