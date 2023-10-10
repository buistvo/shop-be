//import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { errorResponse, formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { ProductDataService } from '@libs/services/product-data-service';

//import schema from './schema';

const getAvailableProductsList = //: ValidatedEventAPIGatewayProxyEvent<typeof schema> =
  async (event) => {
    try {
      return formatJSONResponse(
        await new ProductDataService().getAvailableProductsList()
      );
    } catch (e) {
      console.error('Error executing getAvailableProductsList:', e);
      errorResponse(e);
    }
  };

export const main = middyfy(getAvailableProductsList);
