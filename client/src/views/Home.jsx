import Carousel from "../components/Carousel";
import ProductsGrid from "../components/Grid";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../store/product";
import { useEffect } from "react";

const Home = () => {
  const product = useSelector(s => s.product);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  
  return (
    <>
      <Carousel slides={product.discover} />
      <ProductsGrid />
    </>
  );
};

export default Home;
