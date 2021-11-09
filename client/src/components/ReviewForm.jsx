import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Input,
	Select,
  Textarea,
} from "@chakra-ui/react";

export default function ReviewForm() {
  return (
    <Container w="100%" mt={20} centerContent p='0px'>
      <Flex w="95vw">
        <Box
          bg="#1A202C"
          color="white"
          borderRadius="lg"
          p={{ sm: 2, md: 2, lg: 7 }}
          w="100%"
        >
          <Box p={4}>
            <VStack pl={0} spacing={1} alignItems="center">
              <Box py={{ base: 5, sm: 5, md: 8, lg: 5 }}>
                <Heading>Review Product</Heading>
                <Text mt={{ sm: 3, md: 3, lg: 5 }} color="blue.300">
                  Leave your product opinion down here to help others!
                </Text>
              </Box>
              <Box bg="#F5F5F5" borderRadius="lg" w="95%">
                <Box m={8} color="#0B0E3F">
                  <VStack spacing={5}>
                    <FormControl id="rating" maxW='20rem'>
                      <FormLabel>Personal rating</FormLabel>
                        <Input type="dropdown" size="md" />
											<Select placeholder="Rating">
												<option>1</option>
												<option>2</option>
												<option>3</option>
												<option>4</option>
												<option>5</option>
												<option>6</option>
												<option>7</option>
												<option>8</option>
												<option>9</option>
												<option>10</option>
											</Select>
                    </FormControl>
                    <FormControl id="review">
                      <FormLabel>Review</FormLabel>
                      <Textarea
                        borderColor="gray.300"
                        _hover={{
                          borderRadius: "gray.300",
                        }}
                        placeholder="review"
                      />
                    </FormControl>
                    <FormControl id="submit" float="right">
                      <Button
                        variant="solid"
                        bg="#0D74FF"
                        color="white"
                        _hover={{}}
                      >
                        Submit Review
                      </Button>
                    </FormControl>
                  </VStack>
                </Box>
              </Box>
            </VStack>
          </Box>
        </Box>
      </Flex>
    </Container>
  );
}
