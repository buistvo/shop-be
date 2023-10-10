import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { ProductDataService } from '@libs/services/product-data-service';

const getProductsList = async (event) => {
  return formatJSONResponse(await new ProductDataService().getProductList());
};

export const main = middyfy(getProductsList);
