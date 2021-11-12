import { chakra, Flex, Text } from "@chakra-ui/react";

export const ResponsiveText = (props) => {
  return (
    <Flex align="center" justify="center" wrap="true">
      <chakra.span textOverflow="ellipsis" overflow="hidden">
        <Text align="center">{props.children}</Text>
      </chakra.span>
    </Flex>
  );
};
