export type Product = {
  id: string;
  title: string;
  description?: string;
  price: number;
};
export default Product;

export type ProductCreate = Omit<Product, 'id'> & {
  count: number;
};
