import { Grid, Image, Flex } from "@chakra-ui/react"

const Ofertas = () => {
    return (
        <Grid
        ml="17%"
        mt="100"
        h="200px"
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap={4}
        >
            <Image  />
            <Image  />
            <Image  />
            <Image src="" />
        </Grid>
    )
}

export default Ofertas;