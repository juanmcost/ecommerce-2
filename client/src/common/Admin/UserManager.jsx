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
import { MdAdminPanelSettings } from 'react-icons/md';

import { errorToast, successToast } from '../../utils/toastMessages.js';
import Spinner from './Spinner';

const RemoveProduct = () => {
    const [users, setUsers] = useState([]);
    const [admin, setAdmin] = useState(false);

    const toast = useToast();

    const changeRollUsers = async (id, isAdmin) => {
        try {
            if (isAdmin) {
                const { status } = await axios.put(`/api/user/admin/unset/${id}`);
                if (status === 201) successToast(toast, 'Admin removed', 'Operation completed successfully');
                return setAdmin(true);
            }
            const { status } = await axios.put(`/api/user/admin/set/${id}`);
            if (status === 201) successToast(toast, 'New Admin', 'Operation completed successfully');
            return setAdmin(true);
        } catch (err) {
            errorToast(toast, 'Error', 'Failed on set admin');
        }
    };

    const _handleDelete = async (id) => {
        try {
            const { status } = await axios.delete(`/api/user/${id}`);
            if (status === 204) successToast(toast, 'User Deleted', 'Operation completed successfully');
        } catch (error) {
            errorToast(toast, 'Error at Delete');
        }
    };

    useEffect(() => {
        axios.get('/api/user').then(({ data }) => {
            console.log(data);
            setUsers(data);
        });

        setAdmin(false);
    }, []);

    if (!users.length) return <Spinner />;

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
                            <Th>Username</Th>
                            <Th>Email</Th>
                            <Th>Roll</Th>
                            <Th>See User </Th>
                            <Th>Set Admin </Th>
                            <Th>Delete User </Th>
                        </Tr>
                    </Thead>
                    <Tbody w="75vw">
                        {users.map(({ username, email, createdAt, isAdmin, _id }) => (
                            <Tr>
                                <Td>{username}</Td>
                                <Td>{email}</Td>
                                <Td>{(isAdmin && 'Admin') || 'User'}</Td>
                                <Td>
                                    <Link as={ReachLink} to={`/user/${_id}`}>
                                        <IconButton colorScheme="green" variant="outline" icon={<FiEye />} />
                                    </Link>
                                </Td>
                                <Td>
                                    <IconButton
                                        isDisabled={email === 'admin@admin.com' ? true : false}
                                        colorScheme="teal"
                                        variant={(isAdmin && 'solid') || 'outline'}
                                        icon={<MdAdminPanelSettings />}
                                        onClick={() => {
                                            changeRollUsers(_id, isAdmin);
                                        }}
                                    />
                                </Td>
                                <Td>
                                    <IconButton
                                        isDisabled={email === 'admin@admin.com' ? true : false}
                                        colorScheme="red"
                                        variant="outline"
                                        icon={<BsFillTrashFill />}
                                        onClick={() => {
                                            _handleDelete(_id);
                                            const news = users.filter((item) => item._id !== _id);
                                            setUsers(news);
                                        }}
                                    />
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
