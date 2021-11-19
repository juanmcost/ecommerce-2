import { Box, Flex, Link } from '@chakra-ui/react';
import { FaUsers } from 'react-icons/fa';
import { AiFillEdit } from 'react-icons/ai';
import { IoStatsChartSharp } from 'react-icons/io5';
import { BsCartPlusFill, BsCartXFill } from 'react-icons/bs';
import { MdHome } from 'react-icons/md';
import { Link as ReachLink } from 'react-router-dom';
import React from 'react';

import AdminNavItem from './AdminNavItem';

const AdminSidebar = (props) => (
    <Box
        as="nav"
        pos="absolute"
        left="0"
        zIndex="sticky"
        h="84vh"
        pb="10"
        overflowX="hidden"
        overflowY="auto"
        bg="gray.800"
        borderColor="gray.700"
        borderRightWidth="1px"
        w="60"
        {...props}
    >
        <Flex
            direction="column"
            as="nav"
            fontSize="sm"
            color="gray.600"
            aria-label="Main Navigation"
            lineHeight="50px"
            align="center"
        >
            <Link as={ReachLink} to="/" w="full">
                <AdminNavItem icon={MdHome} justify="center">
                    Go to Home
                </AdminNavItem>
            </Link>

            <AdminNavItem
                id="new"
                icon={BsCartPlusFill}
                w="full"
                justify="center"
                bg={props.view === 'new' && 'gray.900'}
                color={(props.view === 'new' && 'white') || 'gray.400'}
                onClick={(e) => props.setview(e.target.id)}
            >
                New Product
            </AdminNavItem>
            <AdminNavItem
                id="edit"
                icon={AiFillEdit}
                w="full"
                justify="center"
                bg={props.view === 'edit' && 'gray.900'}
                color={(props.view === 'edit' && 'white') || 'gray.400'}
                onClick={(e) => props.setview(e.target.id)}
            >
                Edit a Product
            </AdminNavItem>
            <AdminNavItem
                id="remove"
                icon={BsCartXFill}
                w="full"
                justify="center"
                bg={props.view === 'remove' && 'gray.900'}
                color={(props.view === 'remove' && 'white') || 'gray.400'}
                onClick={(e) => props.setview(e.target.id)}
            >
                Remove Product
            </AdminNavItem>

            <AdminNavItem
                id="users"
                icon={FaUsers}
                w="full"
                justify="center"
                bg={props.view === 'users' && 'gray.900'}
                color={(props.view === 'users' && 'white') || 'gray.400'}
                onClick={(e) => props.setview(e.target.id)}
            >
                Users Manager
            </AdminNavItem>
        </Flex>
    </Box>
);

export default AdminSidebar;
