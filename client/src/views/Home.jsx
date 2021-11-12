import Carousel from "../components/Carousel";
import ProductsGrid from "../components/Grid";
import { dummieData as data } from "../utils/dummieData"
const images = data[4].images //toDo sustituir por info real

const Home = () => {
    return (
        <>
            <Carousel slides={images}/> 
            <ProductsGrid />
        </>
    )
}

export default Home;