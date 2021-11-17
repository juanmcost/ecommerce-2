import { Stack, Heading, Text, Button } from "@chakra-ui/react";
import { EmailIcon } from '@chakra-ui/icons';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"

const EmailSent = () => {
    const navigate = useNavigate();
    const user= useSelector(state => state.user);

    return (
        <Stack align={"center"} mt="50">
            <Heading fontSize={"4xl"}>We've sent you an Email!</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>Please check your inbox to confirm your purchase</Text>
            <EmailIcon boxSize="60"/>
            {/* <Button
                variant="outline"
                colorScheme="teal"
                onClick={()=>navigate(`/${user.username}/myCart`)}
            >
                Done it already?
            </Button> */}
        </Stack>
    )
}

export default EmailSent;