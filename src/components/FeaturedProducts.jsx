import SectionTitle from "./SectionTitle";
import FeaturedProductsGrid from './FeaturedProductsGrid';

const FeaturedProducts = () => {
  return (
    <div className="pt-24">
      <SectionTitle text='produits phare' />
      <FeaturedProductsGrid />
    </div>
  )
}
export default FeaturedProducts;
