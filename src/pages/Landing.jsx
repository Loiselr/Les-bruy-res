import { FeaturedProducts, Hero } from "../components";

import { customFetch } from "../utils";
//const url= '/products?featured=true';
const url='/articles';

export const loader = async () => {
  const response = await customFetch(url);
  console.log(response.data);
  //const products = response.data.data;
  const products = response.data;
  return { products };
};

const Landing = () => {
  return (
    <>
      <Hero />
      <FeaturedProducts />
    </>
  )
};
export default Landing;