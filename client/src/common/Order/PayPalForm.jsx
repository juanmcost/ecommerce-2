import { Stack, Button, FormControl, FormLabel, Input } from '@chakra-ui/react'; // import chackra
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { setPayMethod } from '../../store/order';
import axios from 'axios';

const RenderPayPalForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(setPayMethod('paypal'));
        axios
            .post(`/api/order/confirm`)
            .then(() => navigate(`/emailsent`))
            .catch(() => alert('sorry, there was an error sending the email'));
    };

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <Stack>
                <FormControl id="paypal" isRequired>
                    <FormLabel>Paypal Username</FormLabel>
                    <Input name="paypal" placeholder="Nethan" type="text" />
                </FormControl>
                <FormControl id="paypalpas" isRequired>
                    <FormLabel>Paypal password</FormLabel>
                    <Input name="paypalpas" placeholder="********" type="password" />
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

export default RenderPayPalForm;
