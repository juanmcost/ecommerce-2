import Carousel from "../components/Carousel";
import ProductsGrid from "../components/Grid";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../store/product";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  let slides = [];
  const product = useSelector(s => s.product);
  product.forEach(i => slides.push(i?.img[0]))            //Colocar img de diferentes artículos en un mismo array

  return (
    <>
      <Carousel slides={slides} />
      <ProductsGrid />
    </>
  );
};

export default Home;
