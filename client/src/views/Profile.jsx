import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Divider,
  Flex,
  Stack,
  Table,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  useColorModeValue,
} from "@chakra-ui/react";
import { Image, VStack, Heading, Text, Grid, GridItem, Button, Input, FormControl } from "@chakra-ui/react";

import { Link } from "react-router-dom";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { useState } from "react";
import { sendLogoutRequest } from "../store/user";

export const Profile = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [click, setClick] = useState(false);
  const [click2, setCLick2] = useState(false);
  const [click3, setClick3] = useState(false);

  const [data, setData] = useState({});
  const [data1, setData1] = useState();
  const [data2, setData2] = useState();

  const image = user.image
    ? user.image
    : "https://as.com/betech/imagenes/2016/08/17/portada/1471469193_215446_1471470211_noticia_normal.jpg";

  const alertDelete = () => {
    swal({
      title: "Delete",
      text: "Surely you want to delete your account?",
      icon: "warning",
      buttons: ["No", "yes"],
    }).then((resp) => {
      if (resp) {
        axios
          .get("/api/auth/logout")
          .then(({ data }) => {
            dispatch(sendLogoutRequest(data));
            navigate("/home");
          })
          .catch((err) => ({ err: err.message }));
        axios.delete(`http://localhost:8080/api/user/profile/${user._id}`).then((data) => console.log(data));
      }
    });
  };

  const handleModify = (e) => {
    axios
      .put("http://localhost:8080/api/user/profile/edit", { username: data, email: data1, _id: user._id })
      .then((data) => {
        window.location.reload();
      });
  };

  const handleModify2 = (e) => {
    axios
      .put("http://localhost:8080/api/user/profile/edit", { phone: data, fullname: data1, _id: user._id })
      .then((data) => {
        window.location.reload();
      });
  };

  const handleModify3 = (e) => {
    axios
      .put("http://localhost:8080/api/user/profile/edit", {
        country: data,
        city: data1,
        adress: data2,
        _id: user._id,
      })
      .then((data) => {
        console.log(data);
        window.location.reload();
      });
  };

  ////////

  return (
    <Grid placeItems="left">
      <Link to="/profile/mypurchases">
        <Button w="200px" colorScheme="teal" variant="outline" margin="8px">
          my purchases
        </Button>
      </Link>
      <VStack>
        <Image borderRadius="full" boxSize="150px" src={image} alt="user." />
        <Heading>{user.username}</Heading>
        <Text>Hello, welcome to your profile</Text>
      </VStack>
      <Grid templateColumns="repeat(5, 1fr)" gap={4}>
        <GridItem colSpan={2} h="10" bg="teal" />
        <GridItem colStart={4} colEnd={6} h="10" bg="teal" />
      </Grid>
      <Flex align={"center"} justify={"center"}>
        <Stack align="center" spacing={8} maxW={150} py={12}>
          <Stack align={""}>
            <Heading fontSize={"4xl"}>My data</Heading>
          </Stack>
          ////////
          <Box
            rounded={"lg"}
            w={600}
            m={20}
            bg={useColorModeValue("white", "gray.600")}
            boxShadow={"lg"}
            p={8}
          >
            <Text
              onClick={() => {
                setClick(true);
              }}
              align={"center"}
              fontSize="sm"
              color={"blue.200"}
            >
              Modify account details
            </Text>
            <Text align={"left"}>Account details</Text>
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
                    <FormControl onChange={(e) => setData(e.target.value)}>
                      <Input defaultValue={user.username} placeholder="Username" size="sm" />
                    </FormControl>
                  </Tr>
                  <Tr>
                    <Th>Email</Th>

                    <FormControl onChange={(e) => setData1(e.target.value)}>
                      <Input defaultValue={user.email} placeholder="email" size="sm" />
                    </FormControl>
                  </Tr>
                  <Button marginTop="5px" onClick={handleModify}>
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
            rounded={"lg"}
            w={600}
            m={20}
            bg={useColorModeValue("white", "gray.600")}
            boxShadow={"lg"}
            p={8}
          >
            <Text
              onClick={() => {
                setCLick2(true);
              }}
              align={"right"}
              fontSize="sm"
              color={"blue.200"}
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
                    <Td isNumeric>{user.phone ? user.phone : "-"}</Td>
                  </Tr>
                </Tbody>
              ) : (
                <Tbody>
                  <Tr>
                    <Th>Fullname</Th>
                    <FormControl onChange={(e) => setData1(e.target.value)}>
                      <Input defaultValue={user.fullname} placeholder="Fullname" size="sm" />
                    </FormControl>
                  </Tr>
                  <Tr>
                    <Th>Phone</Th>
                    <FormControl onChange={(e) => setData(e.target.value)}>
                      <Input defaultValue={user.phone} placeholder="Phone" size="sm" />
                    </FormControl>
                  </Tr>
                  <Button marginTop="5px" onClick={handleModify2}>
                    Save
                  </Button>
                  <Button marginTop="5px" marginLeft="5px" onClick={() => setCLick2(false)}>
                    Cancel
                  </Button>
                </Tbody>
              )}
            </Table>
          </Box>
          <Box
            rounded={"lg"}
            w={600}
            m={20}
            bg={useColorModeValue("white", "gray.600")}
            boxShadow={"lg"}
            p={8}
          >
            <Text
              onClick={() => {
                setClick3(true);
              }}
              align={"right"}
              fontSize="sm"
              color={"blue.200"}
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
                    <Td isNumeric>{user.country ? user.country : "-"}</Td>
                  </Tr>
                  <Tr>
                    <Th>City</Th>
                    <Td isNumeric>{user.city ? user.city : "-"}</Td>
                  </Tr>
                  <Tr>
                    <Th>Adress</Th>
                    <Td isNumeric>{user.adress ? user.adress : "-"}</Td>
                  </Tr>
                </Tbody>
              ) : (
                <Tbody>
                  <Tr>
                    <Th>Country</Th>
                    <FormControl onChange={(e) => setData(e.target.value)}>
                      <Input defaultValue={user.country} placeholder="country" size="sm" />
                    </FormControl>
                  </Tr>
                  <Tr>
                    <Th>City</Th>
                    <FormControl onChange={(e) => setData1(e.target.value)}>
                      <Input defaultValue={user.city} placeholder="City" size="sm" />
                    </FormControl>
                  </Tr>
                  <Tr>
                    <Th>Adress</Th>
                    <FormControl onChange={(e) => setData2(e.target.value)}>
                      <Input defaultValue={user.adress} placeholder="Adress" size="sm" />
                    </FormControl>
                  </Tr>

                  <Button marginTop="5px" onClick={handleModify3}>
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

export default Profile;
