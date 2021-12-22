import { Box, Drawer, DrawerContent, DrawerOverlay, Container, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react';

import RemoveProduct from '../components/Admin/RemoveProduct';
import EditProduct from '../components/Admin/EditProduct';
import NewProduct from '../components/Admin/NewProduct';
import UserManager from '../components/Admin/UserManager';
import AdminSidebar from '../components/Admin/AdminSideBar';

const AdminPanel = () => {
    const [view, setView] = useState('');
    const sidebar = useDisclosure();

    return (
        <>
            <Box as="section" bg="gray.700" minH="84vh">
                <AdminSidebar display={{ base: 'none', md: 'unset' }} view={view} setview={setView} />

                <Drawer isOpen={sidebar.isOpen} onClose={sidebar.onClose} placement="left">
                    <DrawerOverlay />
                    <DrawerContent>
                        <AdminSidebar w="full" borderRight="none" />
                    </DrawerContent>
                </Drawer>
                <Box ml={{ base: 0, md: 40 }} transition=".3s ease">
                    <Container maxW="70vw" h="83vh" maxH="83vh" py={12} position="relative" marginLeft="10rem">
                        {view === 'new' ? (
                            <NewProduct />
                        ) : view === 'edit' ? (
                            <EditProduct />
                        ) : view === 'remove' ? (
                            <RemoveProduct />
                        ) : view === 'users' ? (
                            <UserManager />
                        ) : null}
                    </Container>
                </Box>
            </Box>
        </>
    );
};

export default AdminPanel;
