import { Grid, GridItem, Box } from "@chakra-ui/react";
import Item from "./Item";


const productsGrid = () => {
    const aux = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
    
    return (
        <Grid templateColumns="repeat(5, 1fr)" gap={6}>
            {aux.map(num => (
                <Item/>
            ))}
        </Grid>
    )
}

export default productsGrid;