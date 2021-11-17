import { Stack, Heading, Button } from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { setStatus } from "../store/order";
import { useNavigate } from "react-router-dom";

const ConfirmCart = function () {
    const {id, token} = useParams()
    const navigate = useNavigate();
    const user = useSelector(({ user }) => user);
    const order = useSelector(({ order }) => order);
    const dispatch = useDispatch;

    useEffect(() => {
        if (user._id){
            axios.get(`http://localhost:8080/api/order/confirm/${id}/${token}`)
            .then((res) => {
            console.log(res)
            dispatch(setStatus("confirmed")) });
        }
    }, [user])

    return (
        <>
        <h1>hola</h1>
        {order.status === 'confirmed' ? 
            (<Stack>
                <Heading>
                    Cart Confirmed!
                </Heading>
                <Button
                    variant="outline"
                    colorScheme="teal"
                    onClick={()=>navigate(`/${user.username}/myCart`)}
                >
                    continue 
                </Button>
            </Stack>)
            :
            <h1>hola!</h1>}
        </>
    )
}

export default ConfirmCart;