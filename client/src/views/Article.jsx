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
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

export default function Article() {
  const {id} = useParams();
  const product = data[4]
  const [article, setArticle] = useState({})
  useEffect(async () => {
    await axios
    .get(`/api/product/${id}`)
    .then((res) => {
      console.log(res);
      setArticle(res.data)} )
    .catch((err) => (console.log(err)));
    console.log(article)
    window.scrollTo(0, 0);
  }, [id]);
  
  console.log("this is article",article)

  return (
    <Container maxW={"95vw"} py={12}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Flex>
          <Carousel slides={article.img} />
        </Flex>
        <Stack spacing={4}>
          <Heading>{article.title}</Heading>
          <Text color={"gray.500"} fontSize={"lg"}>
            {article.description}
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
              text={article.price}
            />
            <Feature
              icon={
                <Icon as={IoAnalyticsSharp} color={"yellow.500"} w={5} h={5} />
              }
              iconBg={useColorModeValue("yellow.100", "yellow.900")}
              text={`In stock: ${product.quantity}`} //toDo cambiar icono
            />
            <Feature
              icon={
                <Icon as={IoAnalyticsSharp} color={"yellow.500"} w={5} h={5} />
              }
              iconBg={useColorModeValue("yellow.100", "yellow.900")}
              text={`Average rating: ${product.avgRating}`}
            />
          </Stack>
        </Stack>
      </SimpleGrid>
      <Reviews mt={15} />
    </Container>
  );
}
