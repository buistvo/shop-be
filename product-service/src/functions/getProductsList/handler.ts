//import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { mockProducts } from '../../libs/productList';

//import schema from './schema';

const getProductsList = //: ValidatedEventAPIGatewayProxyEvent<typeof schema> =
  async (event) => {
    return formatJSONResponse(mockProducts);
  };

export const main = middyfy(getProductsList);
