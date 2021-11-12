import { Grid, GridItem, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Item from "./Item";
import { Link } from "react-router-dom";

const ProductsGrid = () => {
    const res = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
    
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/product/")
        .then(res => {
            console.log("here it is",res.data)
            setProducts(res.data)});
    }, [])

    return (
        <Grid templateColumns="repeat(5, 1fr)" gap={6}>
            {products.map(elem => (
                <Link to={`/articles/${elem._id}`}>
                    <Item item={elem}/>
                </Link>
            ))}
        </Grid>
    )
}

export default ProductsGrid;