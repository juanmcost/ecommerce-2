import React from "react";
import ProductMiniature from "./ProductMiniature";
import { ResponsiveText } from "../common/ResponsiveText";
import { MyProductListButtons } from "../components/MyProductListButtons";
import { timeConverter } from "../utils/timeConverter";
import {
  Flex,
  GridItem,
  Stack,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
const themer = useColorModeValue;

export const MyProductCard = ({ product }) => {
  const productTime = timeConverter(product.createdAt);

  return (
    <Flex
      rounded={13}
      boxShadow={themer("lg", "dark-lg")}
      bg={themer("white", "gray.800")}
    >
      <Flex align="center" direction={{ base: "row", md: "column" }}>
        <SimpleGrid
          spacingY={3}
          columns={{ base: 1, md: 4 }}
          w="full"
          py={2}
          px="3vw"
          fontWeight="hairline"
        >
          <GridItem rowSpan={2} colSpan={1}>
            <ProductMiniature image={product.img} />
          </GridItem>
          <GridItem rowSpan={1} colSpan={2}>
            <Flex justify="center" align="center" h="100%">
                  <Stack direction={["column", "row"]}>
                    <ResponsiveText>
                      <strong>{product.title}</strong>
                    </ResponsiveText>
                    <Text align="center"> · </Text>
                    <ResponsiveText>{productTime}</ResponsiveText>
                  </Stack>
            </Flex>
          </GridItem>
          <GridItem rowSpan={1} colSpan={2}>
            <Text
              h="100%"
              w="100%"
              textOverflow="ellipsis"
              overflow="hidden"
              whiteSpace="normal"
              noOfLines={5}
              align="justify"
              px="1.5em"
            >
              {product.description}
            </Text>
          </GridItem>
          <GridItem rowSpan={2} pb="1em">
            <MyProductListButtons product={product} />
          </GridItem>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
};
