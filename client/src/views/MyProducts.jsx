import React from "react";
import {
  chakra,
  Flex,
  Icon,
  useColorModeValue,
  Button,
  useBreakpointValue,
  Stack,
  SimpleGrid,
  ButtonGroup,
  IconButton,
} from "@chakra-ui/react";
import { AiFillEdit, AiTwotoneLock } from "react-icons/ai";
import { BsBoxArrowUpRight, BsFillTrashFill } from "react-icons/bs";
import ProductMiniature from "../components/ProductMiniature";

export default function Component() {
  const colorIt = useColorModeValue;
  const breakPoint = useBreakpointValue;
  const data = [
    {
			price: '$1000 USD', 
      desciption: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit culpa velit rerum iure consequatur porro, sed quas dolor nobis atque ipsum. Inventore, repellendus! Accusamus atque explicabo iste nostrum? Natus, ad!',
      image:
        "https://www.funcage.com/blog/wp-content/uploads/2013/11/Weird-Products-That-Actually-Exist-021.jpg",
      name: "Daggy",
      created: "7 days ago",
    },
    {	price: '$1000 USD', 
			desciption: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit culpa velit rerum iure consequatur porro, sed quas dolor nobis atque ipsum. Inventore, repellendus! Accusamus atque explicabo iste nostrum? Natus, ad!',
      image:
        "https://i1.wp.com/www.sopitas.com/wp-content/uploads/2017/01/comercial-random-japon.jpg",
      name: "Anubra",
      created: "23 hours ago",
    },
    {	price: '$1000 USD', 
			desciption: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit culpa velit rerum iure consequatur porro, sed quas dolor nobis atque ipsum. Inventore, repellendus! Accusamus atque explicabo iste nostrum? Natus, ad!',
      image:
        "https://www.redcandy.co.uk/blog/wp-content/uploads/2015/08/blog-pic-nessie.jpg",
      name: "Josef",
      created: "A few seconds ago",
    },
    {	price: '$1000 USD', 
			desciption: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit culpa velit rerum iure consequatur porro, sed quas dolor nobis atque ipsum. Inventore, repellendus! Accusamus atque explicabo iste nostrum? Natus, ad!',
			image: "https://teslasonly.com/wp-content/uploads/2019/05/1558699022.jpg",
      name: "Sage",
      created: "A few hours ago",
    },
  ];

  return (
    <Flex
      w="full"
      bg="gray.600"
      p={50}
      alignItems="center"
      justifyContent="center"
    >
      <Stack
        direction={{ base: "column" }}
        w="full"
        bg={{ md: colorIt("white", "gray.800") }}
        shadow="lg"
      >
        {data.map((token, tid) => {
          return (
            <Flex
              direction={{ base: "row", md: "column" }}
              bg={colorIt("white", "gray.800")}
              key={tid}
            >
              {breakPoint({ base: true, md: tid === 0 }) && (
                <SimpleGrid
                  spacingY={3}
                  columns={{ base: 1, md: 4 }}
                  w={{ base: 120, md: "full" }}
                  textTransform="uppercase"
                  bg={colorIt("gray.100", "gray.700")}
                  color={colorIt("gray.500")}
                  py={{ base: 1, md: 4 }}
                  px={{ base: 2, md: 10 }}
                  fontSize="md"
                  fontWeight="hairline"
                  display="table-header-group"
                >
                  <span>Name</span>
                  <span>Created</span>
                  <span>Data</span>
                  <chakra.span textAlign={{ md: "right" }}>Actions</chakra.span>
                </SimpleGrid>
              )}
              <SimpleGrid
                spacingY={3}
                columns={{ base: 1, md: 4 }}
                w="full"
                py={2}
                px={10}
                fontWeight="hairline"
              >
                <ProductMiniature image={token.image} />
                <span>{token.name}</span>
                <chakra.span
                  textOverflow="ellipsis"
                  overflow="hidden"
                  whiteSpace="nowrap"
                >
                  {token.created}
                </chakra.span>
                <Flex>
                  <Button
                    size="sm"
                    variant="solid"
                    leftIcon={<Icon as={AiTwotoneLock} />}
                    colorScheme="purple"
                  >
                    View Profile
                  </Button>
                </Flex>
                <Flex justify={{ md: "end" }}>
                  <ButtonGroup variant="solid" size="sm" spacing={3}>
                    <IconButton
                      colorScheme="blue"
                      icon={<BsBoxArrowUpRight />}
                    />
                    <IconButton colorScheme="green" icon={<AiFillEdit />} />
                    <IconButton
                      colorScheme="red"
                      variant="outline"
                      icon={<BsFillTrashFill />}
                    />
                  </ButtonGroup>
                </Flex>
              </SimpleGrid>
            </Flex>
          );
        })}
      </Stack>
    </Flex>
  );
}
