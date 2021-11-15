import {
  Box,
  Input,
  Button,
  Stack,
  VStack,
  FormControl,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import Select from "react-select";
import { useForm } from "../hooks/useForm";
import { MultiUploader } from "../components/MultiUploader";

export const ProductForm = () => {
  const dummieCategories = [
    { label: "Cellphone", value: "Cellphone" },
    { label: "Laptop", value: "Laptop" },
  ];
  const dummieDefaults = [
    { label: "hola", value: "hola" },
    { label: "hola2", value: "hola2" },
  ];
  const { form, handleForm } = useForm();
  // const [images, setImages] = useState();
  // const formData = new FormData();

  return (
    <Box bg="#F5F5F5" borderRadius="lg" w="95%">
      <VStack m={8} color="#0B0E3F" spacing={5} align="left">
        <Stack direction={["column", "row"]} spacing="24px">
          <Box>
            <FormControl id="title" align="left">
              <FormLabel>Product Name</FormLabel>
              <Input
                name="title"
                w="30em"
                maxW="100%"
                borderColor="gray.300"
                bg='white'
                _hover={{ borderRadius: "gray.300" }}
                placeholder="Title"
                errorBorderColor="red.500"
                onChange={handleForm}
                isRequired
              />
            </FormControl>
            <FormControl id="price" align="left">
              <FormLabel>Price</FormLabel>
              <Input
                name="price"
                w="30em"
                maxW="100%"
                bg='white'
                borderColor="gray.300"
                _hover={{ borderRadius: "gray.300" }}
                placeholder="Price"
                errorBorderColor="red.500"
                onChange={handleForm}
                isRequired
              />
            </FormControl>
            <FormControl id="category" align="left">
              <FormLabel>Category</FormLabel>
              <Select
                defaultValue={dummieDefaults}
                isMulti
                name="category"
                placeholder="Category"
                bg='white'
                options={dummieCategories}
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </FormControl>
            <FormControl id="color" align="left">
              <FormLabel>Color</FormLabel>
              <Input
                name="color"
                w="30em"
                maxW="100%"
                bg='white'
                borderColor="gray.300"
                _hover={{ borderRadius: "gray.300" }}
                placeholder="Color"
                errorBorderColor="red.500"
                onChange={handleForm}
                isRequired
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl id="images" align="left"></FormControl>
            <MultiUploader />
          </Box>
        </Stack>
        <FormControl id="description">
          <FormLabel>Description</FormLabel>
          <Textarea
            name="description"
            bg='white'
            borderColor="gray.300"
            _hover={{ borderRadius: "gray.300" }}
            placeholder="Description"
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
            Save
          </Button>
        </FormControl>
      </VStack>
    </Box>
  );
};
