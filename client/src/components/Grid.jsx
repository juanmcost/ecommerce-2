import { Grid, GridItem, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Item from "./Item";


const ProductsGrid = () => {
    const res = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
    
    /* const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("")
        .then(res => setProducts(res.data));
    }, []) */

    return (
        <Grid templateColumns="repeat(5, 1fr)" gap={6}>
            {res.map(elem => (
                <Item item={elem}/>
            ))}
        </Grid>
    )
}

export default ProductsGrid;