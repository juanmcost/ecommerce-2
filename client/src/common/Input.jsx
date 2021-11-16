export const Input = ({ field }) => {
  return (
    <FormControl id={field} align="left">
      <FormLabel>{field}</FormLabel>
      <Input
        name={field}
        w="30em"
        maxW="100%"
        borderColor="gray.300"
        _hover={{ borderRadius: "gray.300" }}
        placeholder={field}
        errorBorderColor="red.500"
        onChange={handleForm}
        isRequired
      />
    </FormControl>
  );
};
