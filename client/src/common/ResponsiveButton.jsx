import { Flex, Icon, Button } from "@chakra-ui/react";

export const ResponsiveButton = (props) => {
  return (
    <Flex align="center" justify="center">
      <Button
        size="sm"
        variant="solid"
        colorScheme="purple"
      >
        {props.children}
      </Button>
    </Flex>
  );
};
