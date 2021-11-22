import react, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sendLoginRequest } from "../store/user";
import { successToast, errorToast } from "../utils/toastMessages";
import { FaFacebook, FaGoogle } from "react-icons/fa"; //import react-icons
import axios from 'axios'
import {
  Flex,
  Center,
  Box,
  Divider,
  useToast,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react"; // import chackra

export default function Login() {
  // export default

  //-----SEND LOGIN----------------
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [form, setValues] = useState({
    email: "",
    password: "",
  });

  const handleInput = (event) => {
    setValues({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(sendLoginRequest(form))
        .then((res) => {
          if (res.payload) {
            successToast(toast, `Welcome ${res.payload.username}`);
            navigate("/home");
          } else {
            errorToast(toast, `Wrong email or password`);
          }
        })

        .catch((err) => ({ err: err.message }));
    } catch (error) {
      console.log({ error });
    }
  };
  const handleFacebook = () => {
    const data = axios.get('/api/auth/facebook')
    console.log(data)
  }
  const handleGoogle= () => {
    const data = axios.get('/api/auth/google/callback')
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Sign in to your account</Heading>
            <Text fontSize={"lg"} color={"gray.600"}></Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  name="email"
                  placeholder="example@example.com"
                  type="email"
                  onChange={handleInput}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    name="password"
                    placeholder="*******"
                    type={showPassword ? "text" : "password"}
                    onChange={handleInput}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={5}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link color={"blue.400"}>Forgot password?</Link>
                </Stack>
                <Button
                  bg={"green.400"}
                  color={"white"}
                  _hover={{
                    bg: "green.500",
                  }}
                  type="submit"
                >
                  Sign in
                </Button>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/register");
                  }}
                >
                  Sign Up
                </Button>
                <Divider />
                <Button
                  colorScheme="facebook"
                  leftIcon={<FaFacebook />}
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  // onClick={handleFacebook}
                >
                  Facebook
                </Button>
                <Center>
                  <Button
                    w={"full"}
                    maxW={"md"}
                    variant={"outline"}
                    leftIcon={<FaGoogle />}
                    onClick={handleGoogle}
                  >
                    <Center>
                      <Text>Google</Text>
                    </Center>
                  </Button>
                </Center>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </form>
  );
}
