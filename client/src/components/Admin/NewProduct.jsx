import {
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
} from '@chakra-ui/react';
import { BsPlusCircle } from 'react-icons/bs';
import { MdAdminPanelSettings } from 'react-icons/md';
import React from 'react';

import Feature from '../../common/Admin/Feature';
import useAdminNewProduct from '../../hooks/useAdminNewProduct';

const NewProduct = ({ article, art_id, type }) => {
    const {
        user,
        newProduct,
        color,
        setColor,
        price,
        setPrice,
        category,
        setCategory,
        img,
        setImg,
        title,
        setTitle,
        description,
        setDescription,
        _handleEdit,
        _handleSubmit,
    } = useAdminNewProduct(article, art_id, type);

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
