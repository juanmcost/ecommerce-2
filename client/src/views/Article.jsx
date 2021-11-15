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
import { useEffect } from "react";
import Reviews from "../containers/Reviews";
import Carousel from "../components/Carousel";
import Feature from "../components/Feature";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../store/product";

export default function Article() {
  const { id } = useParams();
  const article = useSelector(({ product }) => product);
  console.log("ProductO", article);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct(id));
  }, [id]);

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
              text={`Main category: ${article.category && article.category[0]}`} //toDo cambiar icono
            />
            <Feature
              icon={
                <Icon as={IoAnalyticsSharp} color={"yellow.500"} w={5} h={5} />
              }
              iconBg={useColorModeValue("yellow.100", "yellow.900")}
              text={`Average rating: ${
                article?.appreciation?.length > 0
                  ? article.appreciation
                  : "Not rated yet"
              }`}
            />
          </Stack>
        </Stack>
      </SimpleGrid>
      <Reviews mt={15} />
    </Container>
  );
}
