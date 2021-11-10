import React from "react";
import { dummieData as data } from "../utils/dummieData";
import { MyProductCard } from "../components/MyProductCard";
import {
  Flex,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
const themer = useColorModeValue;

export default function MyProducts() {
  return (
    <Flex
      w="full"
      bg={themer("gray.200", "gray.600")}
      p={30}
      alignItems="center"
      justifyContent="center"
    >
      <Stack direction={{ base: "column" }} w="full">
        {data.map((token, tid) => {
          return <MyProductCard product={token} key={tid} />;
        })}
      </Stack>
    </Flex>
  );
};