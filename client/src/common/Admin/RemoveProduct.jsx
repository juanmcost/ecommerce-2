import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Divider,
    Flex,
    useToast,
    ButtonGroup,
    Table,
    Link,
    Thead,
    Tbody,
    IconButton,
    Tr,
    Th,
    Td,
    TableCaption,
    Container,
} from '@chakra-ui/react';
import axios from 'axios';
import { Link as ReachLink } from 'react-router-dom';
import { BsFillTrashFill } from 'react-icons/bs';
import { FiEye } from 'react-icons/fi';

import { errorToast, successToast } from '../../utils/toastMessages.js';
import Spinner from './Spinner';

const RemoveProduct = () => {
    const [products, setProducts] = useState([]);
    const toast = useToast();

    const _handleDelete = async (id) => {
        try {
            const { status } = await axios.delete(`/api/product/${id}`);
            if (status === 204) successToast(toast, 'Deleted product', 'Operation completed successfully');
        } catch (error) {
            errorToast(toast, 'Error at Delete');
        }
    };

    useEffect(() => axios.get('/api/product').then(({ data }) => setProducts(data.products)), []);

    if (!products.length) return <Spinner />;
    return (
        <Container maxW="100vw" maxH="83vh" h="83vh">
            <Box
                rounded={'lg'}
                bg="gray.600"
                w="82.9vw"
                boxShadow={'lg'}
                overflowY="scroll"
                overflowX="hidden"
                p={5}
                margin="-12"
                ml="-120px"
                maxH="83vh"
            >
                <Table variant="simple" size="sm">
                    <TableCaption>&reg; Rynok </TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Product Title</Th>
                            <Th>Price</Th>
                            <Th>Created At</Th>
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody w="75vw">
                        {products.map(({ title, price, createdAt, _id }) => (
                            <Tr>
                                <Td>{title}</Td>
                                <Td>{`$ ${price}`}</Td>
                                <Td>{createdAt.substring(0, 10)}</Td>
                                <Td>
                                    <ButtonGroup variant="solid" size="sm" spacing={18}>
                                        <Link as={ReachLink} to={`/articles/${_id}`}>
                                            <IconButton colorScheme="green" icon={<FiEye />} />
                                        </Link>

                                        <IconButton
                                            colorScheme="red"
                                            variant="outline"
                                            icon={<BsFillTrashFill />}
                                            onClick={() => {
                                                _handleDelete(_id);
                                                const news = products.filter((item) => item._id !== _id);
                                                setProducts(news);
                                            }}
                                        />
                                    </ButtonGroup>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
        </Container>
    );
};

export default RemoveProduct;
