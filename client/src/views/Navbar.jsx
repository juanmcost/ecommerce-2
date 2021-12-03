import Logo from '../assets/logo.svg';
import { useDispatch, useSelector } from 'react-redux';
import { Link as ReactLink, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Search from '../components/Search/Search';
import { sendLogoutRequest } from '../store/user';
import {
    Box,
    Flex,
    Avatar,
    Link,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useColorModeValue,
    Stack,
    useColorMode,
    Center,
    Divider,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Icon,
    Image,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { FaShoppingCart } from 'react-icons/fa';

const subCategories = {
    Cellphones: ['Xiaomi', 'LG', 'Motorola', 'Apple'],
    Consoles: ['Consola', 'Games', 'Accesories'],
    Gaming: ['Mouses', 'Keyboards', 'Pads'],
    Informatics: ['Notebooks', 'Tablets', 'Monitors', 'Printers', 'Cartridges', 'All in one and Desktop PC'],
    Computer_Accessories: ['Connectivity', 'Webcam', 'Speakers', 'Stabilizers', 'Backpacks and Notebook Bags'],
};

export default function Navbar() {
    const { colorMode, toggleColorMode } = useColorMode();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const handleLogout = () => {
        axios
            .get('/api/auth/logout')
            .then(({ data }) => {
                dispatch(sendLogoutRequest(data));
                navigate('/home');
            })
            .catch((err) => ({ err: err.message }));
    };

    const user = useSelector((state) => state.user);

    return (
        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} maxW="100vw">
            <Flex h={16} w="full" alignItems={'center'} justifyContent={'space-between'} maxW="100vw">
                <Link as={ReactLink} to="/home">
                    <Box boxSize={10}>
                        <Image src={Logo} />
                    </Box>
                </Link>

                <Search />

                <Stack direction={'row'} spacing={9} alignItems={'center'}>
                    <Button onClick={toggleColorMode} bg="none" rounded="full">
                        {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                    </Button>
                    <Link as={ReactLink} to={user.username ? `/${user.username}/myCart` : `cart`}>
                        <Icon as={FaShoppingCart} />
                    </Link>
                    <Menu>
                        {user.email ? (
                            <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
                                <Avatar size={'sm'} src={''} />
                            </MenuButton>
                        ) : (
                            <Link as={ReactLink} to="/login">
                                <Button>Sign In</Button>
                            </Link>
                        )}
                        <MenuList alignItems={'center'}>
                            <br />
                            <Center>
                                <Avatar size={'2xl'} src={''} />
                            </Center>
                            <br />
                            {user.username ? (
                                <Center>
                                    <p>{user.username}</p>
                                </Center>
                            ) : null}
                            <br />
                            <MenuDivider />
                            <MenuItem>
                                <Link as={ReactLink} to="/profile">
                                    Your Profile
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Link as={ReactLink} to="/profile/order_history">
                                    Your Orders
                                </Link>
                            </MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </Stack>
            </Flex>
            <Divider orientation="horizontal" />
            <Flex display="flex" align="center">
                <Center flex={user.isAdmin ? '1' : '3'}>
                    {Object.keys(subCategories).map((category, i) => (
                        <Popover trigger={'hover'} key={i}>
                            <PopoverTrigger bg="none" on>
                                <Button
                                    borderBottomWidth="0"
                                    transition={'all .3s ease-in-out'}
                                    _hover={{ borderBottomColor: 'gray.500', borderBottomWidth: '2px' }}
                                    bg="none"
                                >
                                    {category.split('_').join(' ')}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <Stack align={'center'}>
                                    {subCategories[category].map((sub, i) => (
                                        <Link
                                            href={`/category/${sub.split(' ').join('_').toLowerCase()}`}
                                            style={{ textDecoration: 'none' }}
                                            key={i}
                                        >
                                            {sub}
                                        </Link>
                                    ))}
                                </Stack>
                            </PopoverContent>
                        </Popover>
                    ))}
                </Center>
                {user.isAdmin && location.pathname !== '/admin/v2' ? (
                    <ReactLink to="/admin">
                        <Button border="2px" padding="0 1.7em" variant="outline" colorScheme="teal">
                            ADMIN PANEL
                        </Button>
                    </ReactLink>
                ) : null}
            </Flex>
        </Box>
    );
}
