import { Stack, Heading, Button, Text } from '@chakra-ui/react';
import React from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

import useConfirmCart from '../../hooks/useConfirmCart';

const ConfirmCart = function () {
    const { id, token } = useParams();
    const navigate = useNavigate();
    const { state } = useConfirmCart(id, token);

    return (
        <>
            {state === 'confirmed' ? (
                <Stack align={'center'} mt="50">
                    <Heading fontSize={'4xl'}>Thank you for your purchase!</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        we have registered your order succesfully
                    </Text>
                    <Button variant="outline" colorScheme="teal" onClick={() => navigate(`/home`)}>
                        back to home
                    </Button>
                </Stack>
            ) : (
                <></>
            )}
            {state === 'error' ? (
                <Stack align={'center'} mt="50">
                    <Heading fontSize={'4xl'}>Oops! Something went wrong :(</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        Your order has not been processed
                    </Text>
                    <Button variant="outline" colorScheme="teal" onClick={() => navigate(`/home`)}>
                        back to home
                    </Button>
                </Stack>
            ) : (
                <></>
            )}
        </>
    );
};

export default ConfirmCart;
