//import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { ProductDataService } from '@libs/services/product-data-service';
import { APIGatewayProxyEvent } from 'aws-lambda';

export const getProductById = async (event: APIGatewayProxyEvent) => {
  const id = event.pathParameters?.id;
  const product = await new ProductDataService().getProductById(id);
  if (!product) return { statusCode: 404, message: 'Product not found' };

  return formatJSONResponse(product);
};

export const main = middyfy(getProductById);
