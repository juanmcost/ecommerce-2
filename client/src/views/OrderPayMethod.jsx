import {
    Flex,
    Box,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    RadioGroup,
    Radio,
    Image,
    FormControl,
    FormLabel,
    Input
  } from "@chakra-ui/react"; // import chackra
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from "react-router-dom"
import { setPayMethod } from "../store/order";
import cardIcons from "../assets/cardIcons.png";
import paypalIcon from "../assets/logo-Paypal.png"

const OrderPayMethod = function () {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const order = useSelector((state) => state.order)
    const user = useSelector((state) => state.user)
    const [method, setMethod] = useState("card");
    

    return (
        <form >
            <Flex
                minH={"100vh"}
                align={"center"}
                justify={"center"}
                bg={useColorModeValue("gray.50", "gray.800")}
            >
                <Stack spacing={8} mx={"auto"} maxW={"1g"} py={12} px={6} align={"center"}>
                    <Stack align={"center"}>
                        <Heading fontSize={"4xl"}>Choose your Payment Method</Heading>
                        <Text fontSize={"lg"} color={"gray.600"}></Text>
                    </Stack>
                    <Box
                        w="50%"
                        rounded={"lg"}
                        bg={useColorModeValue("white", "gray.700")}
                        boxShadow={"lg"}
                        p={8}
                    >
                        <Stack spacing={4}>
                            
                            <RadioGroup onChange={setMethod} value={method}>
                                <Stack
                                align={"start"}
                                justify={"space-between"}
                                >
                                    <Flex>
                                        <Radio value="card">Card</Radio>
                                        <Image w="15%" src={cardIcons} objectFit="contain" />
                                    </Flex>
                                    <Flex>
                                        <Radio value="paypal">PayPal</Radio>
                                        <Image w="10%" ml="2"src={paypalIcon} objectFit="contain" />
                                    </Flex>
                                </Stack>
                            </RadioGroup>

                            {
                                method === "card" ? (
                                    <Stack>
                                        <FormControl>
                                            <FormLabel>Card number</FormLabel>
                                            <Input
                                                name="cardNumber"
                                                placeholder="1234 4567 7891 1234"
                                            />
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>Name on card</FormLabel>
                                            <Input
                                                name="cardNumber"
                                                placeholder="John Snow"
                                            />
                                        </FormControl>
                                        <Stack
                                        direction={{ base: "column", sm: "row" }}
                                        align={"start"}
                                        justify={"space-between"}
                                        >
                                            <FormControl id="expiryDate" isRequired>
                                                <FormLabel>Expiry Date</FormLabel>
                                                <Input
                                                    name="expiryDate"
                                                    placeholder="07/10"
                                                />
                                            </FormControl>
                                            <FormControl id="securityCode" isRequired>
                                                <FormLabel>Security code</FormLabel>
                                                <Input
                                                    name="securityCode"
                                                    placeholder="***"
                                                />
                                            </FormControl>
                                        </Stack>
                                    </Stack>
                                )
                                :
                                <></>
                            }
                            {
                                method === "paypal" ? (
                                    <Stack></Stack>
                                )
                                :
                                <></>
                            }

                            <Stack spacing={5}>
                                <Button
                                bg={"green.400"}
                                color={"white"}
                                _hover={{
                                    bg: "green.500",
                                }}
                                type="submit"
                                >
                                Confirm Purchase
                                </Button>
                                <Button
                                bg={"blue.400"}
                                color={"white"}
                                _hover={{
                                    bg: "blue.500",
                                }}
                                type="button"
                                onClick={(e)=> {e.preventDefault(); navigate(`/new_order/address`)} }
                                >
                                Go Back
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </form>
    )
}

export default OrderPayMethod;