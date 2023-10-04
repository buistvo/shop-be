//import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { availableProductsMock } from '@libs/productList';

//import schema from './schema';

const getAvailableProductsList = //: ValidatedEventAPIGatewayProxyEvent<typeof schema> =
  async (event) => {
    return formatJSONResponse(availableProductsMock);
  };

export const main = middyfy(getAvailableProductsList);
