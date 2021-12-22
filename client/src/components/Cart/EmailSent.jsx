import { Stack, Heading, Text } from '@chakra-ui/react';
import { EmailIcon } from '@chakra-ui/icons';

const EmailSent = () => {
    return (
        <Stack align={'center'} mt="50">
            <Heading fontSize={'4xl'}>We've sent you an Email!</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
                Please check your inbox to confirm your purchase
            </Text>
            <EmailIcon boxSize="60" />
        </Stack>
    );
};

export default EmailSent;
