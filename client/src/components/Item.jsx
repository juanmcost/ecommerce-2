import {
    Flex,
    Circle,
    Box,
    Image,
    Badge,
    useColorModeValue,
    Icon,
    chakra,
    Tooltip,
    Button,
    useToast
  } from '@chakra-ui/react';
  import { useSelector } from 'react-redux';
  import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
  import { FiShoppingCart } from 'react-icons/fi';
  import { successToast, errorToast } from "../utils/toastMessages";
  import axios from "axios";
  import { Link } from 'react-router-dom';

  
  const data = {
    isNew: true,
    imageURL:
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80',
    name: 'Wayfarer Classic',
    price: 4.5,
    rating: 4.2,
    numReviews: 34,
  };
  
  function Rating({ rating, numReviews }) {
    return (
      <Box d="flex" alignItems="center">
        {Array(5)
          .fill('')
          .map((_, i) => {
            const roundedRating = Math.round(rating * 2) / 2;
            if (roundedRating - i >= 1) {
              return (
                <BsStarFill
                  key={i}
                  style={{ marginLeft: '1' }}
                  color={i < rating ? 'teal.500' : 'gray.300'}
                />
              );
            }
            if (roundedRating - i === 0.5) {
              return <BsStarHalf key={i} style={{ marginLeft: '1' }} />;
            }
            return <BsStar key={i} style={{ marginLeft: '1' }} />;
          })}
        <Box as="span" ml="2" color="gray.600" fontSize="sm">
          {numReviews} review{numReviews > 1 && 's'}
        </Box>
      </Box>
    );
  }
  
  function Item( { item } ) {

    const user= useSelector((state) => state.user)
    const toast = useToast();
    
    const addToCart = () => {
      if (user.username){
        let newList = [];

        axios.get(`http://localhost:8080/api/cart/${user._id}`)
        .then(response => response.data)
        .then(dbCart => {
          if (dbCart === null) {
            newList.push({productId: item._id});
            axios.post(`http://localhost:8080/api/cart/`, {products: newList, userId: user._id})
            .then(() => successToast(toast, "product added to cart!"))
            .catch(err => console.log(err));
          }
          else {
            let aux = false
            dbCart.products.forEach(el => {
              if (el.productId === item._id) {
                console.log("i'm in")
                aux = true
                el.quantity++;
                return axios.put(`http://localhost:8080/api/cart/${user._id}`, {products: [...dbCart.products]})
                .then(() => successToast(toast, "summed to cart!"))
              }
            })
            if (!aux) {  
              axios.put(`http://localhost:8080/api/cart/${user._id}`, {products: [...dbCart.products, {productId: item._id}]})
              .then((res) => 
              {console.log("carrito guardado", res.data.products);
              successToast(toast, "product added to cart!");})
            }
          }
        })
      }
      else {
        const jsonCart = localStorage.getItem('carrito');
        let carrito = JSON.parse(jsonCart);
        if (carrito.list.some(el => el.product._id === item._id)) errorToast(toast, "you already have that in the cart");
          else{
            carrito.list.push({product: item, quantity: 1}); 
            localStorage.setItem('carrito', JSON.stringify(carrito));
            successToast(toast, "product added to cart!");
          }  
        }
    }

    return (
      <Flex p={50} w="full" alignItems="center" justifyContent="center">
        <Box
          bg={useColorModeValue('white', 'gray.800')}
          maxW="sm"
          borderWidth="1px"
          rounded="lg"
          shadow="lg"
          position="relative">
          {data.isNew && (
            <Circle
              size="10px"
              position="absolute"
              top={2}
              right={2}
              bg="red.200"
            />
          )}
          
          <Link to={`/articles/${item._id}`}>
            <Image
              src={item.img[0]}
              alt={`Picture of ${item.title}`}
              w="full"
              roundedTop="lg"
            />
          </Link>
  
          <Box p="6">
            <Box d="flex" alignItems="baseline">
              {data.isNew && (
                <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
                  New
                </Badge>
              )}
            </Box>
            <Flex mt="1" justifyContent="space-between" alignContent="center">
              <Box
                fontSize="2xl"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                isTruncated>
                {item.title}
              </Box>
              <Tooltip
                label="Add to cart"
                bg="white"
                placement={'top'}
                color={'gray.800'}
                fontSize={'1.2em'}>
                <Button onClick={()=>{addToCart()}} href={'#'} display={'flex'} bg="none">
                  <Icon as={FiShoppingCart} h={7} w={7} alignSelf={'center'} />
                </Button>
              </Tooltip>
            </Flex>
  
            <Flex justifyContent="space-between" alignContent="center">
              <Rating rating={data.rating} numReviews={data.numReviews} />
              <Box fontSize="2xl" color={useColorModeValue('gray.800', 'white')}>
                <Box as="span" color={'gray.600'} fontSize="lg">
                  $
                </Box>
                {item.price.toFixed(2)}
              </Box>
            </Flex>
          </Box>
        </Box>
      </Flex>
    );
  }
  
  export default Item;