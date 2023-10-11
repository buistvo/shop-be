//import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { errorResponse, formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { ProductDataService } from '@libs/services/product-data-service';

const getAvailableProductsList = async (event) => {
  try {
    return formatJSONResponse(
      await new ProductDataService().getAvailableProductsList()
    );
  } catch (e) {
    console.error('Error executing getAvailableProductsList:', e);
    return errorResponse(e);
  }
};

export const main = middyfy(getAvailableProductsList);
