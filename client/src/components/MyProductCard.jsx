import React from "react";
import { AiFillEdit } from "react-icons/ai";
import { BsBoxArrowUpRight, BsFillTrashFill } from "react-icons/bs";
import ProductMiniature from "./ProductMiniature";
import { ResponsiveText } from "../common/ResponsiveText";
import { ResponsiveButton } from "../common/ResponsiveButton";
import { RespButtonGroup } from "../common/RespButtonGroup";
import {
  Box,
  Flex,
  useColorModeValue,
  Stack,
  SimpleGrid,
  IconButton,
} from "@chakra-ui/react";
const themer = useColorModeValue;

export const MyProductCard = ({ product }) => {
  return (
    <Box
    rounded={13}
    boxShadow={themer("lg", "dark-lg")}
    bg={themer("white", "gray.800")}
  >
    <Flex direction={{ base: "row", md: "column" }}>
      <SimpleGrid
        spacingY={3}
        columns={{ base: 1, md: 5 }}
        w="full"
        py={2}
        px="3vw"
        fontWeight="hairline"
      >
        <ProductMiniature image={product.images[0]} />
        <ResponsiveText>
          <strong>{product.name}</strong>
        </ResponsiveText>
        <ResponsiveText>{product.created}</ResponsiveText>
        <ResponsiveButton>Rating: {product.avgRating}</ResponsiveButton>
        <RespButtonGroup>
          <IconButton
            colorScheme="blue"
            icon={<BsBoxArrowUpRight />}
          />
          <IconButton colorScheme="green" icon={<AiFillEdit />} />
          <IconButton
            colorScheme="red"
            variant="outline"
            icon={<BsFillTrashFill />}
          />
        </RespButtonGroup>
      </SimpleGrid>
    </Flex>
  </Box>
  );
};