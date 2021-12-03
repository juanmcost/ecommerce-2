import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
    Flex,
    useToast,
    Box,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    useColorModeValue,
} from '@chakra-ui/react';
import axios from 'axios';

import { sendLoginRequest } from '../../store/user';
import { successToast } from '../../utils/toastMessages';

export default function Register() {
    const toast = useToast();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const reUser = /^[a-zA-Z0-9]*$/;

    const [form, setValues] = useState({
        email: '',
        username: '',
        password: '',
    });
    const handleInput = (event) => {
        setValues({
            ...form,
            [event.target.name]: event.target.value,
        });
    };
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    function onSubmit(form) {
        const { email, username, password } = form;
        console.log(form);
        axios.post('http://localhost:8080/api/auth/signup', { email, password, username }).then((res) => {
            if (res.status === 200) {
                dispatch(sendLoginRequest({ email, password })).then((res) => {
                    successToast(toast, 'Account created', `Yor account has been created. Enjoy!`);
                    navigate('/home');
                });
            }
        });
    }

    // async function goGoogle() {
    //     const { data } = await axios.get('http://localhost:8080/api/auth/google');
    //     console.log(data);
    // }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Flex minH={'100vh'} align={'center'} justify={'center'} bg={useColorModeValue('gray.50', 'gray.800')}>
                <Stack spacing={8} mx={'auto'} maxW={400} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'}>Register account</Heading>
                    </Stack>
                    <Box rounded={'lg'} w={400} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
                        <Stack spacing={4}>
                            <FormControl
                                isInvalid={!reUser.test(form.username) && errors.username}
                                id="username"
                                isRequired
                            >
                                <FormLabel>Username</FormLabel>
                                <Input
                                    name="username"
                                    placeholder="Your name"
                                    {...register('username', {
                                        required: 'Allow only numbers and characters',
                                        pattern: {
                                            value: reUser,
                                            message: 'Allow Only numbers and characters',
                                        },
                                        minLength: {
                                            value: 3,
                                            message: 'Minimum length should be 3',
                                        },
                                    })}
                                    type="text"
                                    onChange={handleInput}
                                />
                                <FormErrorMessage>{errors.username && errors.username.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={errors.email} id="email" isRequired>
                                <FormLabel>Email address</FormLabel>
                                <Input
                                    name="email"
                                    placeholder="example@example.com"
                                    {...register('email', {
                                        required: 'Email is Required',
                                        pattern: {
                                            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                            message: 'Invalid email address',
                                        },
                                    })}
                                    type="email"
                                    onChange={handleInput}
                                />
                                <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl
                                isInvalid={form.password.length < 8 && errors.password}
                                id="password"
                                isRequired
                            >
                                <FormLabel>Password</FormLabel>
                                <Input
                                    name="password"
                                    placeholder="*******"
                                    {...register('password', {
                                        required: 'Password is Required',
                                        minLength: {
                                            value: 8,
                                            message: 'Password minimun length should be 8',
                                        },
                                    })}
                                    type="password"
                                    onChange={handleInput}
                                />
                                <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
                            </FormControl>
                            <Stack spacing={10}>
                                <Button
                                    bg={'green.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}
                                    type="submit"
                                >
                                    Sign up
                                </Button>
                                {/*
                                <Button
                                    colorScheme="facebook"
                                    leftIcon={<FaFacebook />}
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}
                                >
                                    Facebook
                                </Button>
                                <Center>
                                    <Button
                                        w={'full'}
                                        maxW={'md'}
                                        variant={'outline'}
                                        leftIcon={<FaGoogle />}
                                        onClick={() => goGoogle()}
                                    >
                                        <Center>
                                            <Text>Sign in with Google</Text>
                                        </Center>
                                    </Button>
                                </Center>
                                <Center>
                                    <Button w={'full'} maxW={'md'} variant={'outline'} leftIcon={<GoMarkGithub />}>
                                        <Center>
                                            <Text>Sign in with Github</Text>
                                        </Center>
                                    </Button>
                                </Center>
                                */}
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </form>
    );
}
