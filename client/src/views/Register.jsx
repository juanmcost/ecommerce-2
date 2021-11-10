import React, { useState } from "react"; // import react
import { useDispatch } from "react-redux"; // import dispatch
import { useNavigate} from "react-router-dom"; // import history
import { sendLoginRequest } from "../store/auth"; // import login
import { FaFacebook, FaGoogle } from "react-icons/fa"; //import react-icons
import { GoMarkGithub } from "react-icons/go"; // import react-icons
import { successToast } from "../utils/toastMessages";
import {
  Flex,
  Center,
  useToast,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Redirect,
} from "@chakra-ui/react"; // import chakra
import axios from "axios"; // import axios

export default function Register() {
  //export default

  //-----SEND Register----------------
  const toast = useToast();
  const history = useNavigate();
  const dispatch = useDispatch();

  const reUser = /^[a-zA-Z0-9_.-]*$/;
  const reSp = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~*]/;
  
  const [form, setValues] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [register, setRegister] = useState();

  const handleInput = (event) => {
    setValues({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password, username } = form;
    const res = await axios.post("/api/auth/signup", {
      email,
      password,
      username,
    });
    if (res.status === 200) {
      dispatch(sendLoginRequest({ email, password })).then((res) => {
        successToast(
          toast,
          "Account created",
          `Yor account has been created. Enjoy!`
        );
        history.push("/");
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={400} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Register account</Heading>
          </Stack>
          <Box
            rounded={"lg"}
            w={400}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl isInvalid={reSp.test(form.username)} id="username" isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  name="username"
                  placeholder="Your name"
                  type="text"
                  onChange={handleInput}
                />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  name="email"
                  placeholder="example@example.com"
                  type="email"
                  onChange={handleInput}
                />
              </FormControl>
              <FormControl isInvalid={form.password.length < 8}id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  name="password"
                  placeholder="*******"
                  type="password"
                  onChange={handleInput}
                />
              </FormControl>
              <Stack spacing={10}>
                <Button
                  bg={"green.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  type="submit"
                >
                  Sign in
                </Button>
                <Button
                  colorScheme="facebook"
                  leftIcon={<FaFacebook />}
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Facebook
                </Button>
                <Center>
                  <Button
                    w={"full"}
                    maxW={"md"}
                    variant={"outline"}
                    leftIcon={<FaGoogle />}
                  >
                    <Center>
                      <Text>Sign in with Google</Text>
                    </Center>
                  </Button>
                </Center>
                <Center>
                  <Button
                    w={"full"}
                    maxW={"md"}
                    variant={"outline"}
                    leftIcon={<GoMarkGithub />}
                  >
                    <Center>
                      <Text>Sign in with Github</Text>
                    </Center>
                  </Button>
                </Center>
              </Stack>
            </Stack>
          </Box>
        </Stack>
        {register ? <Redirect to="/login" /> : null}
      </Flex>
    </form>
  );
}
