//import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { ProductDataService } from '@libs/services/product-data-service';

//import schema from './schema';

const getAvailableProductsList = //: ValidatedEventAPIGatewayProxyEvent<typeof schema> =
  async (event) => {
    return formatJSONResponse(
      await new ProductDataService().getAvailableProductsList()
    );
  };

export const main = middyfy(getAvailableProductsList);
