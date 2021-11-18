import {
    Stack,
    Button,
    FormControl,
    FormLabel,
    Input,
    FormHelperText
  } from "@chakra-ui/react"; // import chackra
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setPayMethod } from "../store/order";
import axios from "axios";
import { validateCard } from "../utils/cardsValidation";
import { useToast } from "@chakra-ui/react";

const RenderCardForm = ({handleCardInput}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const toast = useToast();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(setPayMethod("card"));
        if (validateCard(e.target.cardNumber.value, toast )) {
            axios.post(`/api/order/confirm`)
            .then(() => navigate(`/emailsent`))
            .catch(() => alert("sorry, there was an error sending the email"));
        }
    }
    
    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <Stack>
                <FormControl id="cardNumber" isRequired >
                    <FormLabel>Card number</FormLabel>
                    <Input
                        name="cardNumber"
                        placeholder="1234 4567 7891 1234"
                        onChange={(e) => handleCardInput(e)}
                        type="number"
                    />
                    <FormHelperText mb="1">We accept VISA, Mastercard and American Express</FormHelperText>
                </FormControl>
                <FormControl id="cardName" isRequired>
                    <FormLabel>Name on card</FormLabel>
                    <Input
                        name="cardName"
                        placeholder="John Snow"
                        onChange={(e) => handleCardInput(e)}
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
                            onChange={(e) => handleCardInput(e)}
                            type="date"
                        />
                    </FormControl>
                    <FormControl id="securityCode" isRequired>
                        <FormLabel>Security code</FormLabel>
                        <Input
                            name="securityCode"
                            placeholder="***"
                            onChange={(e) => handleCardInput(e)}
                            type="password"
                        />
                    </FormControl>
                </Stack>
            </Stack>
            <Stack spacing={5} mt="5">
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
        </form>
    )
}

export default RenderCardForm;