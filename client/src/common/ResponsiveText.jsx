import { chakra, Flex } from "@chakra-ui/react";

export const ResponsiveText = (props) => {
  return (
    <Flex align="center" justify="center" wrap="true">
      <chakra.span textOverflow="ellipsis" overflow="hidden">
        {props.children}
      </chakra.span>
    </Flex>
  );
};
