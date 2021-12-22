import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Select,
    Textarea,
} from '@chakra-ui/react'; // import chackra
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { countryList } from '../../utils/dummieData';
import { setAddress } from '../../store/order';

const OrderAddress = function () {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [form, setForm] = useState({});

    const handleInput = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(setAddress(form));
        navigate('/new_order/paymethod');
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Flex minH={'100vh'} align={'center'} justify={'center'} bg={useColorModeValue('gray.50', 'gray.800')}>
                    <Stack spacing={8} mx={'auto'} maxW={'1g'} py={12} px={6}>
                        <Stack align={'center'}>
                            <Heading fontSize={'4xl'}>Tell us your shipment address</Heading>
                            <Text fontSize={'lg'} color={'gray.600'}></Text>
                        </Stack>
                        <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
                            <Stack spacing={4}>
                                <FormControl id="country" isRequired>
                                    <FormLabel>Country</FormLabel>
                                    <Select name="country" placeholder="Select country" onChange={handleInput}>
                                        {countryList.map((country) => (
                                            <option>{country}</option>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl id="region" isRequired>
                                    <FormLabel>Region</FormLabel>
                                    <Input name="region" placeholder="Insert State / Province" onChange={handleInput} />
                                </FormControl>
                                <Stack
                                    direction={{ base: 'column', sm: 'row' }}
                                    align={'start'}
                                    justify={'space-between'}
                                >
                                    <FormControl id="city" isRequired>
                                        <FormLabel>city</FormLabel>
                                        <Input name="city" placeholder="Insert City" />
                                    </FormControl>
                                    <FormControl id="postal" isRequired>
                                        <FormLabel>Postal code</FormLabel>
                                        <Input name="postal" placeholder="Insert Postal code" />
                                    </FormControl>
                                </Stack>
                                <FormControl id="address1" isRequired>
                                    <FormLabel>Address line 1</FormLabel>
                                    <Textarea name="address1" placeholder="Insert an address" />
                                </FormControl>
                                <FormControl id="address2">
                                    <FormLabel>Address line 2</FormLabel>
                                    <Textarea name="address2" placeholder="Insert another optional address" />
                                </FormControl>
                                <Stack spacing={5}>
                                    <Button
                                        bg={'green.400'}
                                        color={'white'}
                                        _hover={{
                                            bg: 'green.500',
                                        }}
                                        type="submit"
                                    >
                                        next
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
                                            navigate(`/${user.username}/myCart`);
                                        }}
                                    >
                                        Go Back
                                    </Button>
                                </Stack>
                            </Stack>
                        </Box>
                    </Stack>
                </Flex>
            </form>
        </>
    );
};

export default OrderAddress;
