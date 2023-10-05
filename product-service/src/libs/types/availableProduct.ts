import { Product } from './product';

export type AvailableProduct = Product & {
  count: number;
};

export default AvailableProduct;
