import { DynamoDB } from 'aws-sdk';
import { mockProducts } from './productList';

process.env.AWS_SDK_LOAD_CONFIG = '1';

const dynamoDB = new DynamoDB.DocumentClient();
const productPromises: Promise<any>[] = [];
const stockPromises: Promise<any>[] = [];
const addTestData = async () => {
  const products = mockProducts;
  for (const [index, product] of products.entries()) {
    const productData = {
      TableName: 'products',
      Item: {
        ...product,
      },
    };
    const stockData = {
      TableName: 'stocks',
      Item: {
        product_id: product.id,
        count: index < 5 ? 0 : index,
      },
    };
    productPromises.push(dynamoDB.put(productData).promise());
    stockPromises.push(dynamoDB.put(stockData).promise());
    await Promise.all(productPromises);
    await Promise.all(stockPromises);

    console.log('Test data has been added');
  }
};
addTestData().catch((error) => {
  console.error('Error:', error);
});
