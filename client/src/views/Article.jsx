import {
  Container,
  SimpleGrid,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { IoAnalyticsSharp, IoLogoBitcoin } from "react-icons/io5";
import { React, useEffect } from "react";
import Reviews from "../containers/Reviews";
import Carousel from "../components/Carousel";
import Feature from "../components/Feature";
import { dummieData as data } from "../utils/dummieData"

export default function Article() {
  //const id = useLocation().pathname.split('/')[2]; //toDo Usar para gestionar estado de producto con redux.
  useEffect(() => {
    return "hola";
  }, []);

  return (
    <Container maxW={"95vw"} py={12}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Flex>
          <Carousel slides={data.images} />
        </Flex>
        <Stack spacing={4}>
          <Heading>{data.name}</Heading>
          <Text color={"gray.500"} fontSize={"lg"}>
            {data.desciption}
          </Text>
          <Stack
            spacing={4}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.100", "gray.700")}
              />
            }
          >
            <Feature
              icon={<Icon as={IoLogoBitcoin} color={"green.500"} w={5} h={5} />}
              iconBg={useColorModeValue("green.100", "green.900")}
              text={data.price}
            />
            <Feature
              icon={
                <Icon as={IoAnalyticsSharp} color={"yellow.500"} w={5} h={5} />
              }
              iconBg={useColorModeValue("yellow.100", "yellow.900")}
              text={`In stock: ${data.quantity}`} //toDo cambiar icono
            />
            <Feature
              icon={
                <Icon as={IoAnalyticsSharp} color={"yellow.500"} w={5} h={5} />
              }
              iconBg={useColorModeValue("yellow.100", "yellow.900")}
              text={`Average rating: ${data.avgRating}`}
            />
          </Stack>
        </Stack>
      </SimpleGrid>
      <Reviews mt={15} />
    </Container>
  );
}
