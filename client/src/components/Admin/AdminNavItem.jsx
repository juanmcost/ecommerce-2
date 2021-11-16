import { Flex, Icon } from '@chakra-ui/react';
import React from 'react';

const AdminNavItem = (props) => {
    const { icon, children, ...rest } = props;
    return (
        <Flex
            align="center"
            px="4"
            pl="4"
            py="3"
            cursor="pointer"
            color={'gray.400'}
            _hover={{
                bg: 'gray.900',
                color: 'gray.200',
            }}
            role="group"
            fontWeight="semibold"
            transition=".15s ease"
            {...rest}
        >
            {icon && (
                <Icon
                    mr="2"
                    boxSize="6"
                    _groupHover={{
                        color: 'gray.300',
                    }}
                    as={icon}
                />
            )}
            {children}
        </Flex>
    );
};

export default AdminNavItem;
