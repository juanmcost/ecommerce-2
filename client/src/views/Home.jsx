import Carousel from "../components/Carousel";
import ProductsGrid from "../components/Grid";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../store/product";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, []);
  let slides = [];
  const { product } = useSelector((product) => product);
  console.log('Products:', product)
  product.forEach(i => slides.push(i?.img[0]))

  return (
    <>
      <Carousel slides={slides} />
      <ProductsGrid />
    </>
  );
};

export default Home;
