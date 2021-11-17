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
    Input,
    FormHelperText
  } from "@chakra-ui/react"; // import chackra
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from "react-router-dom"
import { setPayMethod } from "../store/order";
import cardIcons from "../assets/cardIcons.png";
import paypalIcon from "../assets/logo-Paypal.png"
import mercadoPago from "../assets/mercadoPago.png"
import axios from "axios";
import { validateCard } from "../utils/cardsValidation";
import { useToast } from "@chakra-ui/react";
import { setProducts } from "../store/order";
import { setStatus } from "../store/order";

const OrderPayMethod = function () {

    const [method, setMethod] = useState("card");
    const [cardForm, setCardForm] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useToast();
    const total = useSelector(({ total }) => total);
    const user = useSelector(({ user }) => user);
    const order = useSelector(({ order }) => order);
    const address = useSelector(({ address }) => address);
    
    const handleCardInput = (event) => {
        setCardForm({
            ...cardForm,
            [event.target.name]: event.target.value,
        });
    };
    
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (true/* validateCard(e.target.cardNumber.value, toast )*/) {
            axios.get(`/api/cart/${user._id}`)
            .then(res => {
                dispatch(setPayMethod(method));
                console.log("order", order,"address",address)
                dispatch(setProducts({list: res.data.products, total}));
                dispatch(setStatus("confirmed"));
            })
            .then(() => {
                axios.post("/api/order/add", {...order, address})
                .then(() => axios.post(`/api/order/confirm`))
                .then(() => navigate(`/emailsent`));
            });
        }
    }
        
    return (
        <form onSubmit={(e) => handleSubmit(e)}>
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
                                        <Image w="15%" ml="2" src={cardIcons} objectFit="contain" />
                                    </Flex>
                                    <Flex>
                                        <Radio value="paypal">PayPal</Radio>
                                        <Image w="10%" ml="2"src={paypalIcon} objectFit="contain" bg="white" rounded/>
                                    </Flex>
                                    <Flex>
                                        <Radio value="mercadoPago">Mercado Pago</Radio>
                                        <Image w="10%" ml="2"src={mercadoPago} objectFit="contain" />
                                    </Flex>
                                </Stack>
                            </RadioGroup>

                            {
                                method === "card" ? (
                                    
                                        <Stack>
                                            <FormControl id="cardNumber" isRequired >
                                                <FormLabel>Card number</FormLabel>
                                                <Input
                                                    name="cardNumber"
                                                    placeholder="1234 4567 7891 1234"
                                                    onChange={handleCardInput}
                                                    type="number"
                                                />
                                                <FormHelperText mb="1">We accept VISA, Mastercard and American Express</FormHelperText>
                                            </FormControl>
                                            <FormControl id="cardName" isRequired>
                                                <FormLabel>Name on card</FormLabel>
                                                <Input
                                                    name="cardName"
                                                    placeholder="John Snow"
                                                    onChange={handleCardInput}
                                                    type="text"
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
                                                        onChange={handleCardInput}
                                                        type="date"
                                                    />
                                                </FormControl>
                                                <FormControl id="securityCode" isRequired>
                                                    <FormLabel>Security code</FormLabel>
                                                    <Input
                                                        name="securityCode"
                                                        placeholder="***"
                                                        onChange={handleCardInput}
                                                        type="password"
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