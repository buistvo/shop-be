//import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { errorResponse, formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { ProductDataService } from '@libs/services/product-data-service';
import { APIGatewayProxyEvent } from 'aws-lambda';

export const getProductById = async (event: APIGatewayProxyEvent) => {
  try {
    console.log('executing getProductById id: ', event.pathParameters?.id);
    const id = event.pathParameters?.id;
    const product = await new ProductDataService().getProductById(id);
    if (!product) return errorResponse('Product not found', 404);

    return formatJSONResponse(product);
  } catch (e) {
    console.error('Error executing getProductById:', e);
    return errorResponse(e);
  }
};

export const main = middyfy(getProductById);
