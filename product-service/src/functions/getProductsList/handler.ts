import { errorResponse, formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { ProductDataService } from '@libs/services/product-data-service';

const getProductsList = async (event) => {
  try {
    console.log('executing getProductsList');
    return formatJSONResponse(await new ProductDataService().getProductList());
  } catch (e) {
    console.error('Error executing getProductsList:', e);
    return errorResponse(e);
  }
};

export const main = middyfy(getProductsList);
