import React from 'react';
import { useNavigate } from 'react-router-dom'; // import history
import {
    Box,
    Button,
    chakra,
    Flex,
    SimpleGrid,
    Stack,
    Stat,
    StatLabel,
    Link,
    StatNumber,
    useColorModeValue,
} from '@chakra-ui/react';
import { BsCheckLg } from 'react-icons/bs';
import { MdOutlinePendingActions, MdTabletMac, MdOutlineCategory } from 'react-icons/md';
import { FaBox, FaBoxes } from 'react-icons/fa';

function StatsCard(props) {
    const { title, stat, icon } = props;
    return (
        <Stat
            px={{ base: 2, md: 4 }}
            py={'5'}
            shadow={'xl'}
            border={'1px solid'}
            borderColor={useColorModeValue('gray.800', 'gray.500')}
            rounded={'lg'}
        >
            <Flex justifyContent={'space-between'}>
                <Box pl={{ base: 2, md: 4 }}>
                    <StatLabel fontWeight={'medium'} isTruncated>
                        {title}
                    </StatLabel>
                    <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
                        {stat}
                    </StatNumber>
                </Box>
                <Box my={'auto'} color={useColorModeValue('gray.800', 'gray.200')} alignContent={'center'}>
                    {icon}
                </Box>
            </Flex>
        </Stat>
    );
}

const Admin = () => {
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        navigate(`/myProducts`);
    };
    return (
        <>
            <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
                <chakra.h1 textAlign={'center'} fontSize={'4xl'} py={10} fontWeight={'bold'}>
                    Orders
                </chakra.h1>
                <Button
                    mb={5}
                    bg={'green.400'}
                    color={'white'}
                    _hover={{
                        bg: 'blue.500',
                    }}
                    type="button"
                >
                    Show Orders
                </Button>
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
                    <StatsCard title={'Pending'} stat={'50'} icon={<MdOutlinePendingActions size={'3em'} />} />
                    <StatsCard title={'Process'} stat={'20'} icon={<FaBox size={'3em'} />} />
                    <StatsCard title={'Finish'} stat={'35'} icon={<BsCheckLg size={'3em'} />} />
                </SimpleGrid>
            </Box>
            <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
                <chakra.h1 textAlign={'center'} fontSize={'4xl'} fontWeight={'bold'}>
                    My products
                </chakra.h1>
                <Button
                    mb={5}
                    bg={'green.400'}
                    color={'white'}
                    _hover={{
                        bg: 'blue.500',
                    }}
                    onClick={handleClick}
                >
                    Show Products
                </Button>
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
                    <StatsCard title={'Category'} stat={'10'} icon={<MdOutlineCategory size={'3em'} />} />
                    <StatsCard title={'Products'} stat={'30'} icon={<MdTabletMac size={'3em'} />} />
                    <StatsCard title={'Total stock'} stat={'50'} icon={<FaBoxes size={'3em'} />} />
                </SimpleGrid>
            </Box>
        </>
    );
};

export default Admin;
