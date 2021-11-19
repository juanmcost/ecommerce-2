import { Box, Center, Heading, Text, Stack, Avatar, useColorModeValue, Image } from "@chakra-ui/react";
import { useSelector } from "react-redux";
export function CardPurchases({ purchases }) {
  const user = useSelector((state) => state.user);
  console.log(user);

  return (
    <Center py={6}>
      <Box
        maxW={"250px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"md"}
        p={6}
        overflow={"hidden"}
      >
        <Box h={"210px"} bg={"gray.100"} mt={-6} mx={-6} mb={6} pos={"relative"}>
          <Image src={"https://images.fravega.com/f300/05e3b8de62451e98355a9dc9dcaa92d3.jpg"} />
        </Box>
        <Stack>
          <Text
            color={"green.500"}
            textTransform={"uppercase"}
            fontWeight={800}
            fontSize={"sm"}
            letterSpacing={1.1}
          >
            Blog
          </Text>
          <Heading color={useColorModeValue("gray.700", "white")} fontSize={"2xl"} fontFamily={"body"}>
            {"Llegó el " + purchases.fecha}
          </Heading>
          <Text color={"gray.500"}>Celular Xiaomi Note 10S 6GB 128GB Ocean Blue .</Text>
        </Stack>
        <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
          <Avatar
            src={
              "https://as.com/betech/imagenes/2016/08/17/portada/1471469193_215446_1471470211_noticia_normal.jpg"
            }
            alt={"Author"}
          />
          <Stack direction={"column"} spacing={0} fontSize={"sm"}>
            <Text fontWeight={600}>ENTREGADO</Text>
            <Text color={"gray.500"}>Feb 08, 2021 · 6min read</Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}
