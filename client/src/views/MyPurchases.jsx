import React from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Divider,
  Flex,
  Stack,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  useColorModeValue,
} from "@chakra-ui/react";
import { Image, VStack, Heading, Text, Grid, GridItem, Button, Center, Avatar } from "@chakra-ui/react";
import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { SimpleGrid, Icon } from "@chakra-ui/react";
import { CardPurchases } from "../components/CardPurchases";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const MyPurchases = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  console.log("user", user);

  const [compras, setCompras] = useState();
  const image = user.image
    ? user.image
    : "https://as.com/betech/imagenes/2016/08/17/portada/1471469193_215446_1471470211_noticia_normal.jpg";

  /* useEffect(() => {
      
      axios.get("/compras")
        .then((data) => setcompras(data))
        .catch(console.error);
    }, []); */

  const array = [
    { fecha: " 4 de noviembre" },
    { fecha: " 2 de ocutbre" },
    { fecha: " 4 de agosto" },
    { fecha: " 28 de julio" },
    { fecha: " 17 de mayo" },
  ];
  return (
    <Grid>
      <Link to="/profile">
        <Button w="200px" colorScheme="teal" variant="outline" margin="8px">
          My data
        </Button>
      </Link>
      <VStack>
        <Image borderRadius="full" boxSize="150px" src={image} alt="user." />
        <Heading>{user.username}</Heading>
        <Text>These are your purchases</Text>
      </VStack>
      <Grid templateColumns="repeat(5, 1fr)" gap={4}>
        <GridItem colSpan={2} h="10" bg="teal" />
        <GridItem colStart={4} colEnd={6} h="10" bg="teal" />
      </Grid>

      <SimpleGrid margin="12px" marginTop="10" columns={5} spacing={1}>
        {array.map((e, i) => (
          <CardPurchases purchases={e} />
        ))}
      </SimpleGrid>
    </Grid>
  );
};
