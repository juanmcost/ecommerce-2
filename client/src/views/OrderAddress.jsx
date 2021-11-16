import {
    Flex,
    Box,
    useToast,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    InputGroup,
    InputRightElement,
    Select
  } from "@chakra-ui/react"; // import chackra
  import {useNavigate} from "react-router-dom"
  import {countryList} from "../utils/dummieData";


const OrderAddress = function () {
    const navigate = useNavigate();
    return (
        <form>
            <Flex
                minH={"100vh"}
                align={"center"}
                justify={"center"}
                bg={useColorModeValue("gray.50", "gray.800")}
            >
                <Stack spacing={8} mx={"auto"} maxW={"1g"} py={12} px={6}>
                    <Stack align={"center"}>
                        <Heading fontSize={"4xl"}>Tell us your shipment address</Heading>
                        <Text fontSize={"lg"} color={"gray.600"}></Text>
                    </Stack>
                    <Box
                        rounded={"lg"}
                        bg={useColorModeValue("white", "gray.700")}
                        boxShadow={"lg"}
                        p={8}
                    >
                        <Stack spacing={4}>
                        <FormControl id="country" isRequired>
                            <FormLabel>Country</FormLabel>
                            <Select placeholder="Select country">
                                {countryList.map(country => (<option>{country}</option>))}
                            </Select>
                        </FormControl>
                        <FormControl id="region" isRequired>
                            <FormLabel>Region</FormLabel>
                            <Input
                                name="region"
                                placeholder="Insert State / Province"
                            />
                        </FormControl>
                        <Stack
                        direction={{ base: "column", sm: "row" }}
                        align={"start"}
                        justify={"space-between"}
                        >
                            <FormControl id="city" isRequired>
                                <FormLabel>city</FormLabel>
                                <Input
                                    name="city"
                                    placeholder="Insert City"
                                />
                            </FormControl>
                            <FormControl id="postal" isRequired>
                                <FormLabel>Postal code</FormLabel>
                                <Input
                                    name="postal"
                                    placeholder="Insert Postal code"
                                />
                            </FormControl>
                        </Stack>
                        <FormControl id="address1" isRequired>
                            <FormLabel>Address line 1</FormLabel>
                            <Input
                                name="city"
                                placeholder="Insert an address"
                            />
                        </FormControl>
                        <FormControl id="address2">
                            <FormLabel>Address line 2</FormLabel>
                            <Input
                                name="city"
                                placeholder="Insert City"
                            />
                        </FormControl>
                        <Stack spacing={5}>
                            <Button
                            bg={"green.400"}
                            color={"white"}
                            _hover={{
                                bg: "green.500",
                            }}
                            type="submit"
                            onClick={(e)=> {e.preventDefault(); navigate('/new_order/contact')} }
                            >
                            next
                            </Button>
                        </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </form>
    )
}

export default OrderAddress;