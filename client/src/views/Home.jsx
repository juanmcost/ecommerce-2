import Carousel from "../components/Carousel";
import ProductsGrid from "../components/Grid";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../store/product";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useDispatch();
  const { product } = useSelector((product) => product);
  let slides = [];
  product.forEach(i => slides.push(i.img[0]))
  console.log('SLIDES', slides)
  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  return (
    <>
      <Carousel slides={slides} />
      <ProductsGrid />
    </>
  );
};

export default Home;
