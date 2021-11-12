import { Flex, Button } from "@chakra-ui/react";

export const ResponsiveButton = (props) => {
  return (
    <Flex align="center" justify="center">
      <Button
        onClick={props.onClick}
        size="sm"
        variant="solid"
        colorScheme="purple"
      >
        {props.children}
      </Button>
    </Flex>
  );
};
