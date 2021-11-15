import { Container, Flex, Box, Heading, Text, VStack } from "@chakra-ui/react";
import { ProductForm } from "../components/ProductForm";
import { ResponsiveText } from "../common/ResponsiveText";

export const ModifyProduct = () => {
  return (
    <Container w="100%" mt={20} centerContent p="0px" mt="0">
      <Flex w="95vw">
        <Box
          bg="#1A202C"
          color="white"
          borderRadius="lg"
          p={{ sm: 2, md: 2, lg: 7 }}
          w="100%"
        >
          <Box p={4}>
            <VStack pl={0} spacing={2}>
              <Box py={{ base: 5, sm: 5, md: 8, lg: 5 }}>
                <ResponsiveText>
                  <Heading>Modify Article</Heading>
                  <Text mt={{ sm: 3, md: 3, lg: 5 }} color="blue.300">
                    You can modify your product here.
                  </Text>
                </ResponsiveText>
              </Box>
              <ProductForm />
            </VStack>
          </Box>
        </Box>
      </Flex>
    </Container>
  );
};
