import {
  ValidatedEventAPIGatewayProxyEvent,
  errorResponse,
  formatJSONResponse,
} from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { ProductDataService } from '@libs/services/product-data-service';
import { ProductCreate } from '@libs/types/product';
import * as yup from 'yup';

const productCreateValidationSchema = yup.object().shape({
  title: yup.string().required(),
  price: yup.number().moreThan(0).required(),
  description: yup.string().nullable(),
});

const createProduct: ValidatedEventAPIGatewayProxyEvent<ProductCreate> = async (
  event
) => {
  try {
    await productCreateValidationSchema.validate(event.body);
    return formatJSONResponse(
      await new ProductDataService().createProduct(event.body)
    );
  } catch (e) {
    console.error('Error executing createProduct:', e.errors || e);
    return errorResponse(e.errors || e);
  }
};

export const main = middyfy(createProduct);
