import {
    Container,
    Button,
    Flex,
    InputGroup,
    InputLeftAddon,
    Stack,
    StackDivider,
    Icon,
    Input,
    Box,
    Image,
    useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { BsPlusCircle } from 'react-icons/bs';
import { MdAdminPanelSettings } from 'react-icons/md';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import Feature from './Feature';
import { toastDelete, toastAdd } from '../../utils/toastMessages.js';

const NewProduct = ({ article, art_id, type }) => {
    const user = useSelector(({ user }) => user);
    const toast = useToast();

    const [img, setImg] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState(0);
    const [color, setColor] = useState('');

    const newProduct = {
        title,
        description,
        img,
        category: category.split(' '),
        price: Number(price),
        color,
    };

    const _handleSubmit = async (newProduct) => {
        try {
            //Check if the product already exist
            const { data } = await axios.get(`/api/product/admin/${title}`);
            if (data.length) return toastDelete(toast, 'Error at create!');

            //if not exist
            const res = await axios.post('/api/product/add', newProduct);
            return res.status === 201 ? toastAdd(toast, 'Success at create!') : toastDelete(toast, 'Error at create!');
        } catch (err) {
            toastDelete(toast, 'Error at create!');
        }
    };

    const _handleEdit = async (product) => {
        try {
            const res = await axios.put(`/api/product/${art_id}`, product);
            return res.status === 200 ? toastAdd(toast, 'Success at edit!') : toastDelete(toast, 'Error at edit!');
        } catch (err) {
            toastDelete(toast, 'Error at edit!');
        }
    };

    useEffect(() => {
        setImg((type && article.img[0]) || '');
        setTitle((type && article.title) || '');
        setDescription((type && article.description) || '');
        setCategory((type && article.category.join(' ')) || '');
        setPrice((type && article.price) || 0);
        setColor((type && article.color) || '');
    }, [article]);

    return (
        <>
            <Flex justifyContent={'space-between'} direction="row" w="100%" h="80%" align="center" marginLeft={5}>
                <Flex direction="column" justifyContent={'space-between'} flex={1} mr="20px">
                    {img.length < 10 ? (
                        <Icon
                            as={BsPlusCircle}
                            w="170px"
                            h="170px"
                            m="5.5rem"
                            color="gray.400"
                            _hover={{ transform: 'scale(1.1)', color: '#fff' }}
                            transition=".3s ease"
                            cursor="pointer"
                        />
                    ) : (
                        <Box w="70%" h="80%" mb="1.8rem" align="center">
                            <Image src={img} mt={12} maxH="330px" maxW="250px" />
                        </Box>
                    )}

                    <Box w="full" h="80px" ml={'-5rem'}>
                        <InputGroup>
                            <InputLeftAddon
                                children="* Image URL "
                                mr="10px"
                                w="6.5rem"
                                fontSize="md"
                                fontWeight="bold"
                                justifyContent={'center'}
                                bg="teal.500"
                            />
                            <Input
                                variant="flushed"
                                placeholder="Image URL"
                                transition=".3s ease"
                                value={img}
                                onChange={(e) => setImg(e.target.value)}
                            />
                        </InputGroup>
                    </Box>
                </Flex>

                <Stack spacing={9}>
                    <InputGroup>
                        <InputLeftAddon
                            children="* Title "
                            mr="10px"
                            w="6.5rem"
                            fontSize="md"
                            fontWeight="bold"
                            justifyContent={'center'}
                            bg="teal.400"
                        />
                        <Input
                            variant="flushed"
                            w="25rem"
                            placeholder="LG K50"
                            fontSize={'xl'}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </InputGroup>

                    <InputGroup>
                        <InputLeftAddon
                            children="* Description"
                            fontWeight="bold"
                            mr="10px"
                            w="6.5rem"
                            fontSize="md"
                            justifyContent={'center'}
                            bg="teal.500"
                        />
                        <Input
                            variant="flushed"
                            w="25rem"
                            placeholder="Smartphone LG"
                            fontSize={'md'}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </InputGroup>
                    <InputGroup>
                        <InputLeftAddon
                            children="* Categories"
                            fontWeight="bold"
                            mr="10px"
                            w="6.5rem"
                            fontSize="md"
                            justifyContent={'center'}
                            bg="teal.600"
                        />
                        <Input
                            variant="flushed"
                            w="25rem"
                            placeholder="Smartphone Black LG"
                            fontSize={'md'}
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                    </InputGroup>
                    <InputGroup>
                        <InputLeftAddon
                            children="* Price $"
                            fontWeight="bold"
                            mr="10px"
                            w="6.5rem"
                            fontSize="md"
                            justifyContent={'center'}
                            bg="teal.700"
                        />
                        <Input
                            variant="flushed"
                            w="25rem"
                            placeholder="25999"
                            fontSize={'md'}
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </InputGroup>
                    <InputGroup>
                        <InputLeftAddon
                            children="Color"
                            fontWeight="bold"
                            mr="10px"
                            w="6.5rem"
                            fontSize="md"
                            justifyContent={'center'}
                            bg="teal.800"
                        />
                        <Input
                            variant="flushed"
                            w="25rem"
                            placeholder="25999"
                            fontSize={'md'}
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                        />
                    </InputGroup>
                </Stack>
            </Flex>
            <Flex direction="row" justifyContent={'space-between'} mt="2rem">
                <Button
                    w="30%"
                    p="6"
                    variant="outline"
                    colorScheme="teal"
                    mr="10rem"
                    onClick={() => (type && _handleEdit(newProduct)) || _handleSubmit(newProduct)}
                >
                    {`${(type && 'Edit') || 'Create'} Product`}
                </Button>
                <Stack spacing={4} divider={<StackDivider borderColor="gray.700" />}>
                    <Feature
                        icon={<Icon as={MdAdminPanelSettings} color={'teal.200'} w={'3rem'} h={'3rem'} />}
                        iconBg="teal.900"
                        text={`Product ${(type && 'edited') || 'created'} by ${user.username} `}
                    />
                </Stack>
            </Flex>
        </>
    );
};

export default NewProduct;
