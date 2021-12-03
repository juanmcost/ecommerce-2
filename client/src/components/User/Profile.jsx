import { useSelector, useDispatch } from 'react-redux';
import {
    Box,
    Divider,
    Flex,
    Stack,
    Table,
    Text,
    Tbody,
    Tr,
    Th,
    Td,
    useColorModeValue,
    Image,
    VStack,
    Heading,
    Grid,
    GridItem,
    Button,
    Input,
    FormControl,
} from '@chakra-ui/react';

import { Link } from 'react-router-dom';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { useState } from 'react';
import { sendLogoutRequest, editUser } from '../../store/user';

import perfil from '../../assets/perfil.png';

const Profile2 = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [click, setClick] = useState(false);
    const [click2, setClick2] = useState(false);
    const [click3, setClick3] = useState(false);

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [fullname, setFullname] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');

    const image = user.image ? user.image : perfil;

    const alertDelete = () => {
        swal({
            title: 'Delete',
            text: 'Surely you want to delete your account?',
            icon: 'warning',
            buttons: ['No', 'yes'],
        }).then((resp) => {
            if (resp) {
                axios
                    .get('/api/auth/logout')
                    .then(({ data }) => {
                        dispatch(sendLogoutRequest(data));
                        navigate('/home');
                    })
                    .catch((err) => ({ err: err.message }));
                axios.delete(`api/user/profile/${user._id}`).then((data) => console.log(data));
            }
        });
    };

    const handleModify = () => {
        const input = {
            id: user._id,
            props: {
                email: email === '' ? user.email : email,
                username: username === '' ? user.username : username,
                fullname: fullname === '' ? user.fullname : fullname,
                phone: phone === '' ? user.phone : phone,
                country: country === '' ? user.country : country,
                city: city === '' ? user.city : city,
                address: address === '' ? user.address : address,
            },
        };
        console.log({ input });
        dispatch(editUser(input));
    };

    return (
        <Grid placeItems="left" mt={10} alignItems="center">
            <VStack m={5}>
                <Image borderRadius="full" boxSize="150px" src={image} alt="user." />
                <Heading>{user.username}</Heading>
                <Text fontWeight={'bold'}>Welcome to your profile</Text>
            </VStack>
            <Grid templateColumns="repeat(5, 1fr)" gap={4}>
                <GridItem colSpan={2} h="10" bg="teal" />
                <Link to="/profile/order_history" align="center">
                    <Button
                        boxShadow={'lg'}
                        colorScheme="teal"
                        variant="outline"
                        margin="2px"
                        px={12}
                        letterSpacing={2}
                    >
                        My orders
                    </Button>
                </Link>
                <GridItem colStart={4} colEnd={6} h="10" bg="teal" />
            </Grid>

            <Flex align={'center'} justify={'center'}>
                <Stack align="center" spacing={8} maxW={150} py={12}>
                    <Stack align={''}>
                        <Heading fontSize={'4xl'}>My data</Heading>
                    </Stack>

                    <Box
                        rounded={'lg'}
                        w={600}
                        m={20}
                        bg={useColorModeValue('white', 'gray.600')}
                        boxShadow={'lg'}
                        p={8}
                    >
                        <Text
                            onClick={() => {
                                setClick(true);
                            }}
                            align="right"
                            fontSize="sm"
                            color={'blue.200'}
                            cursor="pointer"
                        >
                            Modify account details
                        </Text>
                        <Text align={'left'}>Account details</Text>
                        <Divider orientation="horizontal" />
                        <Table variant="simple">
                            {!click ? (
                                <Tbody>
                                    <Tr>
                                        <Th>Username</Th>

                                        <Td isNumeric>{user.username}</Td>
                                    </Tr>
                                    <Tr>
                                        <Th>Email</Th>
                                        <Td isNumeric>{user.email}</Td>
                                    </Tr>
                                </Tbody>
                            ) : (
                                <Tbody>
                                    <Tr>
                                        <Th>Username</Th>
                                        <FormControl onChange={(e) => setUsername(e.target.value)}>
                                            <Input defaultValue={user.username} placeholder="Username" size="sm" />
                                        </FormControl>
                                    </Tr>
                                    <Tr>
                                        <Th>Email</Th>
                                        <FormControl onChange={(e) => setEmail(e.target.value)}>
                                            <Input defaultValue={user.email} placeholder="email" size="sm" />
                                        </FormControl>
                                    </Tr>
                                    <Button
                                        marginTop="5px"
                                        onClick={() => {
                                            handleModify();
                                            setClick(!click);
                                        }}
                                    >
                                        Save
                                    </Button>
                                    <Button marginTop="5px" marginLeft="5px" onClick={() => setClick(false)}>
                                        Cancel
                                    </Button>
                                </Tbody>
                            )}
                        </Table>
                    </Box>
                    <Box
                        rounded={'lg'}
                        w={600}
                        m={20}
                        bg={useColorModeValue('white', 'gray.600')}
                        boxShadow={'lg'}
                        p={8}
                    >
                        <Text
                            onClick={() => {
                                setClick2(true);
                            }}
                            align={'right'}
                            fontSize="sm"
                            color={'blue.200'}
                            cursor="pointer"
                        >
                            Modify personal data
                        </Text>
                        <Text>Personal data</Text>
                        <Divider orientation="horizontal" />
                        <Table variant="simple">
                            {!click2 ? (
                                <Tbody>
                                    <Tr>
                                        <Th>Fullname</Th>
                                        <Td isNumeric>{user.fullname ? user.fullname : user.username}</Td>
                                    </Tr>

                                    <Tr>
                                        <Th>Phone</Th>
                                        <Td isNumeric>{user.phone ? user.phone : '-'}</Td>
                                    </Tr>
                                </Tbody>
                            ) : (
                                <Tbody>
                                    <Tr>
                                        <Th>Fullname</Th>
                                        <FormControl onChange={(e) => setFullname(e.target.value)}>
                                            <Input
                                                defaultValue={user.fullname ? user.fullname : user.username}
                                                placeholder="Fullname"
                                                size="sm"
                                            />
                                        </FormControl>
                                    </Tr>
                                    <Tr>
                                        <Th>Phone</Th>
                                        <FormControl onChange={(e) => setPhone(parseInt(e.target.value))}>
                                            <Input defaultValue={user.phone} placeholder="03517696435" size="sm" />
                                        </FormControl>
                                    </Tr>
                                    <Button
                                        marginTop="5px"
                                        onClick={() => {
                                            handleModify();
                                            setClick2(!click2);
                                        }}
                                    >
                                        Save
                                    </Button>
                                    <Button marginTop="5px" marginLeft="5px" onClick={() => setClick2(!click2)}>
                                        Cancel
                                    </Button>
                                </Tbody>
                            )}
                        </Table>
                    </Box>
                    <Box
                        rounded={'lg'}
                        w={600}
                        m={20}
                        bg={useColorModeValue('white', 'gray.600')}
                        boxShadow={'lg'}
                        p={8}
                    >
                        <Text
                            onClick={() => {
                                setClick3(true);
                            }}
                            align={'right'}
                            fontSize="sm"
                            color={'blue.200'}
                            cursor="pointer"
                        >
                            Modify shipping data
                        </Text>
                        <Text>Shipping data</Text>
                        <Divider orientation="horizontal" />
                        <Table variant="simple">
                            {!click3 ? (
                                <Tbody>
                                    <Tr>
                                        <Th>Country</Th>
                                        <Td isNumeric>{user.country ? user.country : '-'}</Td>
                                    </Tr>
                                    <Tr>
                                        <Th>City</Th>
                                        <Td isNumeric>{user.city ? user.city : '-'}</Td>
                                    </Tr>
                                    <Tr>
                                        <Th>Address</Th>
                                        <Td isNumeric>{user.address ? user.address : '-'}</Td>
                                    </Tr>
                                </Tbody>
                            ) : (
                                <Tbody>
                                    <Tr>
                                        <Th>Country</Th>
                                        <FormControl onChange={(e) => setCountry(e.target.value)}>
                                            <Input defaultValue={user.country} placeholder="country" size="sm" />
                                        </FormControl>
                                    </Tr>
                                    <Tr>
                                        <Th>City</Th>
                                        <FormControl onChange={(e) => setCity(e.target.value)}>
                                            <Input defaultValue={user.city} placeholder="City" size="sm" />
                                        </FormControl>
                                    </Tr>
                                    <Tr>
                                        <Th>Address</Th>
                                        <FormControl onChange={(e) => setAddress(e.target.value)}>
                                            <Input defaultValue={user.address} placeholder="Address" size="sm" />
                                        </FormControl>
                                    </Tr>

                                    <Button
                                        marginTop="5px"
                                        onClick={() => {
                                            handleModify();
                                            setClick3(!click3);
                                        }}
                                    >
                                        Save
                                    </Button>
                                    <Button marginTop="5px" marginLeft="5px" onClick={() => setClick3(false)}>
                                        Cancel
                                    </Button>
                                </Tbody>
                            )}
                        </Table>
                    </Box>
                </Stack>
            </Flex>

            <Stack align="center" direction="row" spacing={4}>
                <Button onClick={alertDelete} left="600" colorScheme="red" margin="12px" variant="solid">
                    delete account
                </Button>
            </Stack>
        </Grid>
    );
};

export default Profile2;
