import {
  ValidatedEventAPIGatewayProxyEvent,
  errorResponse,
  formatJSONResponse,
} from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { ProductDataService } from '@libs/services/product-data-service';
import { ProductCreate } from '@libs/types/product';

const createProduct: ValidatedEventAPIGatewayProxyEvent<ProductCreate> = async (
  event
) => {
  try {
    return formatJSONResponse(
      await new ProductDataService().createProduct(event.body)
    );
  } catch (e) {
    console.error('Error executing createProduct:', e);
    return errorResponse(e);
  }
};

export const main = middyfy(createProduct);
