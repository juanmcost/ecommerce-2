import { chakra, Flex } from "@chakra-ui/react";

export const ResponsiveText = (props) => {
	return (
    <Flex align="center" justify="center">
      <chakra.span
        textOverflow="ellipsis"
        overflow="hidden"
        whiteSpace="nowrap"
      >
        {props.children}
      </chakra.span>
    </Flex>
  );
};
