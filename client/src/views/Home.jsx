import Carousel from '../components/Carousel';
import ProductsGrid from '../components/Grid';
import { useSelector, useDispatch } from 'react-redux';
import { getAllProducts } from '../store/product';
import { useEffect } from 'react';
import Spinner from '../common/Admin/Spinner';

const Home = () => {
    const dispatch = useDispatch();
    const { product } = useSelector((product) => product);
    let slides = [];
    product.length && product.forEach((i) => slides.push(i.img[0]));
    console.log('SLIDES', slides);
    useEffect(() => {
        dispatch(getAllProducts());
    }, []);

    if (!product.length) return <Spinner />;

    return (
        <>
            <Carousel slides={slides} />
            <ProductsGrid />
        </>
    );
};

export default Home;
