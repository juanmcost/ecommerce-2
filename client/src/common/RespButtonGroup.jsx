import { Flex, ButtonGroup } from "@chakra-ui/react";

export const RespButtonGroup = (props) => {
  return (
    <Flex justify="center" align="center">
      <ButtonGroup variant="solid" size="sm" spacing={3}>
        {props.children}
      </ButtonGroup>
    </Flex>
  );
};
