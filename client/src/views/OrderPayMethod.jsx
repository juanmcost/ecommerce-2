import {
    Flex,
    Box,
    Stack,
    Heading,
    useColorModeValue,
    RadioGroup,
    Radio,
    Image,
  } from "@chakra-ui/react"; // import chackra
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import cardIcons from "../assets/cardIcons.png";
import paypalIcon from "../assets/logo-Paypal.png"
import mercadoPago from "../assets/mercadoPago.png"
import RenderCardForm from "../components/CreditCardForm";
import RenderPayPalForm from "../components/PayPalForm";

const OrderPayMethod = function () {
    const [method, setMethod] = useState("card");
    const [cardForm, setCardForm] = useState({});
    
    const handleCardInput = (event) => {
        setCardForm({
            ...cardForm,
            [event.target.name]: event.target.value,
        });
    };
        
    return (
            <Flex
                minH={"100vh"}
                align={"center"}
                justify={"center"}
                bg={useColorModeValue("gray.50", "gray.800")}
            >
                <Stack spacing={8} mx={"auto"} maxW={"1g"} py={12} px={6} align={"center"}>
                    <Stack align={"center"}>
                        <Heading fontSize={"4xl"}>Choose your Payment Method</Heading>
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
                                        <Radio value="card">card</Radio>
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
                        </Stack>
                        {method === "card"? <RenderCardForm handleCardInput={handleCardInput} /> : <></>}
                        {method === "paypal"? <RenderPayPalForm /> : <></>}
                    </Box>
                </Stack>
            </Flex>
    )
}

export default OrderPayMethod;