import React, { useState } from 'react';
import { Box, Table, Link, Thead, Tbody, IconButton, Tr, Th, Td, TableCaption, Container } from '@chakra-ui/react';
import { Link as ReachLink } from 'react-router-dom';
import { BsFillTrashFill } from 'react-icons/bs';
import { FiEye } from 'react-icons/fi';
import { MdAdminPanelSettings } from 'react-icons/md';

import Spinner from '../../common/Spinner/Spinner';
import useAdminUserManager from '../../hooks/useAdminUserManager';

const RemoveProduct = () => {
    const { _handleDelete, changeRollUsers, users, setUsers } = useAdminUserManager();

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
                        {users.map(({ username, email, isAdmin, _id }) => (
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
