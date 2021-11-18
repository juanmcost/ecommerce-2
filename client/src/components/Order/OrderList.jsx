import React from "react";
import {
  Box,
  Divider,
  Flex,
  Heading,
  Stack,
  Table,
  Text,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  useColorModeValue,
} from "@chakra-ui/react";

const OrderList = (prop) => {
  console.log(`prop`, prop);
  const { address, products, payMethod, amount } = prop.item;
  console.log(address);
  console.log(products);
  console.log(payMethod);
  console.log(amount);

  return (
    <Box
      rounded={"lg"}
      w={600}
      m={20}
      bg={useColorModeValue("white", "gray.600")}
      boxShadow={"lg"}
      p={8}
    >
      <Text align={"left"}>Datos de cuenta</Text>
      <Divider orientation="horizontal" />
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>To convert</Th>
            <Th>into</Th>
            <Th isNumeric>multiply by</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Th>Username</Th>
            <Td isNumeric>1</Td>
          </Tr>
          <Tr>
            <Th>Email</Th>
            <Td isNumeric>1</Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};

export default OrderList;
