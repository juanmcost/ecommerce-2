import { Stack, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { setPayMethod } from '../../store/order';
import axios from 'axios';

const RenderMercadoPagoForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(setPayMethod('Mercado Pago'));
        axios
            .post(`/api/order/confirm`)
            .then(() => navigate(`/emailsent`))
            .catch(() => alert('sorry, there was an error sending the email'));
    };

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <Stack>
                <FormControl id="mercadopagouser" isRequired>
                    <FormLabel>Mercado Pago Username</FormLabel>
                    <Input name="mercadopagouser" placeholder="Nethan" type="text" />
                </FormControl>
                <FormControl id="mercadopagopas" isRequired>
                    <FormLabel>Mercado Pago password</FormLabel>
                    <Input name="mercadopagopas" placeholder="********" type="password" />
                </FormControl>
            </Stack>
            <Stack spacing={5} mt="5">
                <Button
                    bg={'green.400'}
                    color={'white'}
                    _hover={{
                        bg: 'green.500',
                    }}
                    type="submit"
                >
                    Confirm Purchase
                </Button>
                <Button
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                        bg: 'blue.500',
                    }}
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        navigate(`/new_order/address`);
                    }}
                >
                    Go Back
                </Button>
            </Stack>
        </form>
    );
};

export default RenderMercadoPagoForm;
