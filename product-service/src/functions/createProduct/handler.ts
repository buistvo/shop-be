import {
  ValidatedEventAPIGatewayProxyEvent,
  errorResponse,
  formatJSONResponse,
} from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { ProductDataService } from '@libs/services/product-data-service';
import { ProductValidatorService } from '@libs/services/product-validator-service';
import { ProductCreate } from '@libs/types/product';
const createProduct: ValidatedEventAPIGatewayProxyEvent<ProductCreate> = async (
  event
) => {
  try {
    console.log('executing createProduct', event.body);
    try {
      await new ProductValidatorService().validate(event.body);
    } catch (validationError) {
      console.error('Validation error:', validationError.errors);
      return errorResponse(validationError.errors, 400);
    }
    return formatJSONResponse(
      await new ProductDataService().createProduct(event.body)
    );
  } catch (e) {
    console.error('Error executing createProduct:', e.errors || e);
    return errorResponse(e.errors || e);
  }
};

export const main = middyfy(createProduct);
