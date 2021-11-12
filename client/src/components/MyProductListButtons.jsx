import { AiFillEdit } from "react-icons/ai";
import { BsBoxArrowUpRight, BsFillTrashFill } from "react-icons/bs";
import { RespButtonGroup } from "../common/RespButtonGroup";
import { IconButton } from "@chakra-ui/react";
import { ResponsiveButton } from "../common/ResponsiveButton";
import { Spacer, VStack } from "@chakra-ui/react";
import { handleSee, handleModify } from '../utils/redirect'

export const MyProductListButtons = ({ product }) => {
  const handleDelete = () => {
    console.log('delete', product.id)
  };

  return (
    <VStack>
      <ResponsiveButton onClick={() => {handleSee(product.id)}}>
        Rating: {product.avgRating}
      </ResponsiveButton>
      <Spacer />
      <Spacer />
      <RespButtonGroup>
        <IconButton
          onClick={() => {handleSee(product.id)}}
          colorScheme="blue"
          icon={<BsBoxArrowUpRight />}
        />
        <IconButton
          onClick={() => handleModify(product.id)}
          colorScheme="green"
          icon={<AiFillEdit />}
        />
        <IconButton
          onClick={handleDelete}
          colorScheme="red"
          variant="outline"
          icon={<BsFillTrashFill />}
        />
      </RespButtonGroup>
    </VStack>
  );
};
