import Carousel from '../components/Home/Carousel';
import ProductsGrid from '../components/Home/Grid';
import { useSelector } from 'react-redux';
import { IoIosArrowUp } from 'react-icons/io';
import {
    Button,
    Text,
    Box,
    Icon,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
} from '@chakra-ui/react';
import 'animate.css';

import useHome from '../hooks/useHome';

const Home = () => {
    const products = useSelector(({ product }) => product.products);
    const user = useSelector(({ user }) => user);
    const { isOpen, setIsOpen, scrollPosition, mergeCart } = useHome();

    return (
        <>
            <AlertDialog isOpen={isOpen && user.username}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            There are products left in the local cart!
                        </AlertDialogHeader>

                        <AlertDialogBody>Do you want to move the products to your personal cart?</AlertDialogBody>
                        <AlertDialogFooter>
                            <Button onClick={() => setIsOpen(false)}>
                                <Text overflow="hidden">No, leave my cart as it is</Text>
                            </Button>
                            <Button colorScheme="green" onClick={() => mergeCart()} ml={3}>
                                <Text overflow="hidden">Yes, please move them to my cart</Text>
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>

            <Box
                className={
                    (scrollPosition > 80 && 'animate__animated animate__bounceInDown') ||
                    'animate__animated animate__bounceOutUp'
                }
                position="fixed"
                bottom="20px"
                right={['16px', '20px']}
                zIndex={1}
                h="10%"
                w="5%"
                bg="teal.200"
                rounded="full"
                py={1}
                display={scrollPosition < 80 && 'none'}
                fontSize="30"
                align="center"
                justifyContent="center"
                cursor="pointer"
                transition="all 0.3s ease"
                onClick={() => window.scrollTo(0, 0)}
            >
                <Icon as={IoIosArrowUp} h={'90%'} w={'90%'} color="teal.900" />
            </Box>

            <Carousel slides={products} />
            <ProductsGrid />
        </>
    );
};

export default Home;
