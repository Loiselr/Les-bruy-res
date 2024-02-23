import { Filters, ProductsContainer } from "../components";
import { customFetch } from "../utils";

const url = '/articles'

export const loader = async ({ request }) => {
  const response = await customFetch(url);
  console.log(response);
  
  const products = response.data;
  return { products }
};

const Products = () => {
  return (
    <>
      <Filters />
      <ProductsContainer />
    </>
  )
};
export default Products;