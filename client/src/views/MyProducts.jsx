import { useEffect } from "react";
import { dummieData as data } from "../utils/dummieData";
import { Flex, IconButton, useColorModeValue, Stack } from "@chakra-ui/react";
import { MyProductCard } from "../components/MyProductCard";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../store/allActions";
import { BiAddToQueue } from "react-icons/bi";
import { handleNew } from "../utils/redirect";
const themer = useColorModeValue;

export default function MyProducts() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <Flex w="full" bg={themer("gray.200", "gray.600")} p={30}>
      <Stack direction={{ base: "column" }} w="full">
        <IconButton
          onClick={handleNew}
          colorScheme="blue"
          icon={<BiAddToQueue />}
        />
        {data.map((token, tid) => {
          return <MyProductCard product={token} key={tid} />;
        })}
      </Stack>
    </Flex>
  );
}
