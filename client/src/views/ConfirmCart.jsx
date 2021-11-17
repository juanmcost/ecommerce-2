import { Stack, Heading, Button, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { setStatus } from "../store/order";
import { useNavigate } from "react-router-dom";
import { setProducts } from "../store/order";
import { useState } from "react";
import { setTotal } from "../store/total";
import { resetOrder } from "../store/order";

const ConfirmCart = function () {
    const {id, token} = useParams()
    const navigate = useNavigate();
    const total = useSelector(({ total }) => total);
    const order = useSelector(({ order }) => order);
    const address = useSelector(({ address }) => address);
    const dispatch = useDispatch();
    const [state, setState] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/order/confirm/${id}/${token}`)
        .then((res) => res.data )
        .then( () => {
            setState(true)
            dispatch(setTotal(0));
            dispatch(resetOrder());
            axios.delete(`http://localhost:8080/api/cart/${id}`);
        });
    }, [])

    return (
        <>
        {state? 
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
            :
            <></>}
        </>
    )
}

export default ConfirmCart;