import { Stack, Heading, Button, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { setStatus } from "../store/order";
import { setProducts } from "../store/order";
import { setAmount } from "../store/order";
import { getOrder } from "../store/order";
import { resetOrder } from "../store/order";

const ConfirmCart = function () {
    const {id, token} = useParams()
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const order = useSelector(state => state.order)
    const [state, setState] = useState("empty");

    useEffect(() => {
        axios.get(`http://localhost:8080/api/order/confirm/${id}/${token}`)
        .then(res => res.data )
        .then(dbCart => {
            axios.post("/api/order/add", {
                address: order.address,
                payMethod: order.payMethod, 
                amount: dbCart.total, 
                products: dbCart.list
            })
            .then(() => {
                dispatch(resetOrder());
                axios.delete(`http://localhost:8080/api/cart/${id}`)
                setState("confirmed");
            })
            .catch(err => {
                console.log(err)
                dispatch(resetOrder());
                setState("addError")
            })
        })
        .catch(err => {
            console.log(err)
            setState("confirmError")
        });
    }, [])

    return (
        <>
        {state === "confirmed"? 
            <Stack align={"center"} mt="50">
                <Heading fontSize={"4xl"}>Thank you for your purchase!</Heading>
                <Text fontSize={"lg"} color={"gray.600"}>we have registered your order succesfully</Text>
                <Button
                    variant="outline"
                    colorScheme="teal"
                    onClick={()=>navigate(`/home`)}
                >
                    back to home
                </Button>
            </Stack>
            :<></>}
        {state === "addError"?
            <Stack align={"center"} mt="50">
                <Heading fontSize={"4xl"}>Oops! Something went wrong :(</Heading>
                <Text fontSize={"lg"} color={"gray.600"}>Your order has not been processed</Text>
                <Button
                    variant="outline"
                    colorScheme="teal"
                    onClick={()=>navigate(`/home`)}
                >
                    back to home
                </Button>
            </Stack>
            :<></>}
        {state === "confirmError"?
            <Stack align={"center"} mt="50">
                <Heading fontSize={"4xl"}>Oops! Something went wrong :(</Heading>
                <Text fontSize={"lg"} color={"gray.600"}>cart not confirmed</Text>
                <Button
                    variant="outline"
                    colorScheme="teal"
                    onClick={()=>navigate(`/home`)}
                >
                    back to home
                </Button>
            </Stack>
            :<></>}
        </>
    )
}

export default ConfirmCart;