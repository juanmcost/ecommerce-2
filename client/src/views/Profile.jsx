import React from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Divider,
  Flex,
  Heading,
  Stack,
  Table,
  Text,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  useColorModeValue,
} from "@chakra-ui/react";

const Profile = () => {
  const user = useSelector((state) => state.user);
  console.log("user", user);

  return (
    <Flex align={"center"} justify={"center"}>
      <Stack spacing={8} maxW={900} py={12}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>My Data</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          w={600}
          m={20}
          bg={useColorModeValue("white", "gray.600")}
          boxShadow={"lg"}
          p={8}
        >
          <Text align={"right"} fontSize="sm" color={"blue.200"}>
            Modificar datos de cuenta
          </Text>
          <Text align={"left"}>Datos de cuenta</Text>
          <Divider orientation="horizontal" />
          <Table variant="simple">
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
          <Text align={"right"} fontSize="sm" color={"blue.200"}>
            Modificar datos personales
          </Text>
          <Text>Datos personales</Text>
          <Divider orientation="horizontal" />
          <Table variant="simple">
            <Tbody>
              <Tr>
                <Th>Nombre y Apellido</Th>
                <Td isNumeric>Diego Maradona</Td>
              </Tr>
              <Tr>
                <Th>Documento</Th>
                <Td isNumeric>14.276.579</Td>
              </Tr>
              <Tr>
                <Th>Telefono</Th>
                <Td isNumeric>0303456-nananana</Td>
              </Tr>
            </Tbody>
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
          <Text align={"right"} fontSize="sm" color={"blue.200"}>
            Modificar datos de envio
          </Text>
          <Text>Datos de Envio</Text>
          <Divider orientation="horizontal" />
          <Table variant="simple">
            <Tbody>
              <Tr>
                <Th>Pais</Th>
                <Td isNumeric>Argentina</Td>
              </Tr>
              <Tr>
                <Th>Provincia</Th>
                <Td isNumeric>Tierra del Fuego</Td>
              </Tr>
              <Tr>
                <Th>Ciudad</Th>
                <Td isNumeric>De la furia</Td>
              </Tr>
              <Tr>
                <Th>Direccion</Th>
                <Td isNumeric>Calle falsa 123</Td>
              </Tr>
              <Tr>
                <Th>Codigo postal</Th>
                <Td isNumeric>420</Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Profile;
