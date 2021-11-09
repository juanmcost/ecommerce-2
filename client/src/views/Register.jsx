import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";

const Register = () => {
  return (
    <div>
      <FormControl id="email">
        <FormLabel>Email address</FormLabel>
        <Input type="email" />
        <FormHelperText>We'll never share your email.</FormHelperText>
      </FormControl>
      
    </div>
  );
};

export default Register;
