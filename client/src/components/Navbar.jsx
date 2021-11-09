import { ReactNode } from 'react';
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
    useDisclosure,
    useColorModeValue,
    Stack,
    useColorMode,
    Center,
    Divider,
    Collapse,
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

export default function Navbar() {
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose, onToggle } = useDisclosure();

    const subCategories = {
        cellphones: ["samsung"],
        computers: ["LG", "tu vieja"]
    }

    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <Box>logo</Box>

                    <Flex alignItems={'center'}>
                        <Stack direction={'row'} spacing={7}>
                            <Button onClick={toggleColorMode} rounded="2xl">
                                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                            </Button>

                            <Menu>
                                <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
                                    <Avatar size={'sm'} src={'https://avatars.dicebear.com/api/male/username.svg'} />
                                </MenuButton>
                                <MenuList alignItems={'center'}>
                                    <br />
                                    <Center>
                                        <Avatar size={'2xl'} src={'https://avatars.dicebear.com/api/male/username.svg'} />
                                    </Center>
                                    <br />
                                    <Center>
                                        <p>Username</p>
                                    </Center>
                                    <br />
                                    <MenuDivider />
                                    <MenuItem>Your Servers</MenuItem>
                                    <MenuItem>Account Settings</MenuItem>
                                    <MenuItem>Logout</MenuItem>
                                </MenuList>
                            </Menu>
                        </Stack>
                    </Flex>
                </Flex>
                <Divider orientation="horizontal"/>
                {Object.keys(subCategories).map((category, i) => (
                    <Popover trigger={"hover"} key={i}>
                        <PopoverTrigger bg="none" on>
                            <Button bg="none">
                                {category}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <Stack>
                                {subCategories[category].map((sub, i) => (
                                    <Box key={i}>{sub}</Box>
                                ))}
                            </Stack>
                        </PopoverContent>
                    </Popover>
                ))}
            </Box>
        </>
    );
}
