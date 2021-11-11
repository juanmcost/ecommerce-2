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
import { useForm } from '../hooks/useForm'

export default function ReviewForm() {
  const { form, handleForm } = useForm();
	// const handleSubmit = () => {
	  //console.log(form);																//toDo handleSubmit
	// }

	return (
    <Container w="100%" mt={20} centerContent p="0px">
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
                <Heading>Review this article</Heading>
                <Text mt={{ sm: 3, md: 3, lg: 5 }} color="blue.300">
                  Leave your product opinion down here to help others!
                </Text>
              </Box>
              <Box bg="#F5F5F5" borderRadius="lg" w="95%">
                <VStack m={8} color="#0B0E3F" spacing={5} align="left">
                  <FormControl id="rating" maxW="20rem">
                    <FormLabel>Personal rating</FormLabel>
                    <Select
											name='rating'
                      w="7vw"
                      borderColor="gray.300"
                      _hover={{ borderRadius: "gray.300" }}
                      placeholder="Rating"
											onChange={handleForm}
                      isRequired
                    >
                      <option>10</option>
                      <option>9</option>
                      <option>8</option>
                      <option>7</option>
                      <option>6</option>
                      <option>5</option>
                      <option>4</option>
                      <option>3</option>
                      <option>2</option>
                      <option>1</option>
                    </Select>
                  </FormControl>
                  <FormControl id="title" align="left">
                    <FormLabel>Title</FormLabel>
                    <Input
											name='title'
                      w="40vw"
                      borderColor="gray.300"
                      _hover={{ borderRadius: "gray.300" }}
                      placeholder="Title"
                      errorBorderColor="red.500"
											onChange={handleForm}
                      isRequired
                    />
                  </FormControl>
                  <FormControl id="review">
                    <FormLabel>Review</FormLabel>
                    <Textarea
											name='review'
                      borderColor="gray.300"
                      _hover={{ borderRadius: "gray.300" }}
                      placeholder="Review"
                      errorBorderColor="red.500"
                      isRequired
											onChange={handleForm}
                    />
                  </FormControl>
                  <FormControl id="submit" float="right">
                    <Button
                      variant="solid"
                      bg="#1A202C"
                      color="white"
                      _hover={{ backgroundColor: "#1C4A5C" }}
                    >
                      Submit Review
                    </Button>
                  </FormControl>
                </VStack>
              </Box>
            </VStack>
          </Box>
        </Box>
      </Flex>
    </Container>
  );
}
