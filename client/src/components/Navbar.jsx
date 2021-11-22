import Logo from "../assets/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { Link as ReactLink, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Search from "./Search/Search";
import { sendLogoutRequest } from "../store/user";
import { useState, useEffect } from "react";
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
  Spacer,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { FaShoppingCart } from "react-icons/fa";

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogout = () => {
    axios
      .get("/api/auth/logout")
      .then(({ data }) => {
        dispatch(sendLogoutRequest(data));
        navigate("/home");
      })
      .catch((err) => ({ err: err.message }));
  };

  const subCategories = {
    cellphones_by_brand: ["Xiaomi", "LG", "Motorola", "Apple"],
    consoles_and_videogames: [
      "consola",
      "games",
      "accesories",
      "Xbox",
    ],
    gaming_PC: ["mouses", "keyboards", "pads"],
    informatics: [
      "notebooks",
      "tablets",
      "monitors",
      "printers",
      "cartridges",
      "all in one and desktop PC",
    ],
    computer_accessories: [
      "connectivity",
      "webcam",
      "speakers",
      "stabilizers",
      "backpacks and notebook bags",
    ],
  };

  const user = useSelector((state) => state.user);

  return (
    <>
      <Box minW="382px" bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Stack direction="column">
          <Flex h={16} alignItems={"center"}>
            <Stack direction="row" spacing="1em">
              <Link as={ReactLink} to="/home">
                <Box boxSize={10}>
                  <Image src={Logo} alt="Segun Adebayo" />
                </Box>
              </Link>
              <Search />
            </Stack>
            <Spacer />
            <Box>
              <Flex alignItems={"center"}>
                <Stack direction={"row"} spacing={7} alignItems={"center"}>
                  <Button onClick={toggleColorMode} bg="none" rounded="full">
                    {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                  </Button>
                  <Link
                    as={ReactLink}
                    to={user.username ? `/${user.username}/myCart` : `cart`}
                  >
                    <Icon as={FaShoppingCart} />
                  </Link>
                  <Menu>
                    {user.email ? (
                      <MenuButton
                        as={Button}
                        rounded={"full"}
                        variant={"link"}
                        cursor={"pointer"}
                        minW={0}
                      >
                        <Avatar
                          size={"sm"}
                          src={
                            "https://avatars.dicebear.com/api/male/username.svg"
                          }
                        />
                      </MenuButton>
                    ) : (
                      <Link as={ReactLink} to="/login">
                        <Button>Sign In</Button>
                      </Link>
                    )}
                    <MenuList alignItems={"center"}>
                      <br />
                      <Center>
                        <Avatar
                          size={"2xl"}
                          src={
                            "https://avatars.dicebear.com/api/male/username.svg"
                          }
                        />
                      </Center>
                      <br />
                      {user.username ? (
                        <Center>
                          <p>{user.username}</p>
                        </Center>
                      ) : null}
                      <br />
                      <MenuDivider />
                      {user.isAdmin && (
                        <Flex justify="center" align="center" py='1em'>
                          <ReactLink to="/admin/v2">
                            <Button
                              border="2px"
                              borderColor="red.700"
                              padding="0 1.7em"
                              variant="outline"
                              _hover={{ bg: "red.700" }}
                            >
                              ADMIN PANEL
                            </Button>
                          </ReactLink>
                        </Flex>
                      )}
                      <MenuItem>
                        <Link as={ReactLink} to="/profile">
                        Account Settings
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </MenuList>
                  </Menu>
                </Stack>
              </Flex>
            </Box>
          </Flex>
          <Divider orientation="horizontal" />
          <Flex w="100%" display="flex" align="center" justify="center">
            <Flex wrap="wrap-reverse" justify="space-around">
              {user.isAdmin && location.pathname !== "/admin/v2" && (
                <Stack
                  direction={["column", "row"]}
                  w="100%"
                  flex={user.isAdmin ? "1" : "3"}
                >
                  {Object.keys(subCategories).map((category, i) => (
                    <Popover trigger={"hover"} key={i}>
                      <PopoverTrigger bg="none" on>
                        <Button bg="none">
                          {category.split("_").join(" ")}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <Stack align={"center"}>
                          {subCategories[category].map((sub, i) => (
                            <Link
                              as={ReactLink}
                              to={`/categories/${category}/${sub
                                .split(" ")
                                .join("_")}`}
                              style={{ textDecoration: "none" }}
                              key={i}
                            >
                              {sub}
                            </Link>
                          ))}
                        </Stack>
                      </PopoverContent>
                    </Popover>
                  ))}
                </Stack>
              )}
            </Flex>
          </Flex>
        </Stack>
      </Box>
    </>
  );
}
