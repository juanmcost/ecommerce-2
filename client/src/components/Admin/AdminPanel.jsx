import { Box, Drawer, DrawerContent, DrawerOverlay, Flex, Text, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react';
import NewProduct from '../../common/Admin/NewProduct';

import AdminSidebar from './AdminSideBar';

const AdminPanel = () => {
    const [viewState, setViewState] = useState('');
    const [article, setArticle] = useState({
        img: 'https://lh3.googleusercontent.com/proxy/PrkIbopHtY7FxjV18loFcgmD_3mo1800NeHT_9mwK1TJQMqX5SSlW6Ljr5VG3tmcolQCzrkVYu9f4STCuBMWHyE0-MetLoxuy3Slh0-MqyXx',
    });
    const sidebar = useDisclosure();

    return (
        <>
            <Box as="section" bg="gray.700" minH="84vh">
                <AdminSidebar
                    display={{ base: 'none', md: 'unset' }}
                    view={viewState}
                    setview={setViewState}
                />

                <Drawer isOpen={sidebar.isOpen} onClose={sidebar.onClose} placement="left">
                    <DrawerOverlay />
                    <DrawerContent>
                        <AdminSidebar w="full" borderRight="none" />
                    </DrawerContent>
                </Drawer>
                <Box ml={{ base: 0, md: 40 }} transition=".3s ease">
                    <NewProduct article={article}></NewProduct>
                </Box>
            </Box>
        </>
    );
};

export default AdminPanel;
