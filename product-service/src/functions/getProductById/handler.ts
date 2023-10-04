//import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { mockProducts } from '@libs/productList';
import { APIGatewayProxyEvent } from 'aws-lambda';

//import schema from './schema';

const getProductById = //: ValidatedEventAPIGatewayProxyEvent<typeof schema> =
  async (event: APIGatewayProxyEvent) => {
    const id = event.pathParameters?.id;
    const product = mockProducts.find((p) => p.id === id);
    if (!product) return { statusCode: 404, message: 'Product not found' };

    return formatJSONResponse(product);
  };

export const main = middyfy(getProductById);
