//import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'product/available',
        cors: {
          origin: 'https://d17npkfpw4myuc.cloudfront.net',
          headers: [
            'Content-Type',
            'X-Amz-Date',
            'Authorization',
            'X-Api-Key',
            'X-Amz-Security-Token',
            'X-Amz-User-Agent',
            'Access-Control-Allow-Origin',
          ],
        },
        documentation: {
          summary: 'Get available products',
          description: 'Get available products',
          methodResponses: [
            {
              statusCode: 200,
              responseBody: {
                description: 'Available Products',
              },
              responseModels: {
                'application/json': 'AvailableProductList',
              },
            },
            {
              statusCode: 400,
              responseBody: {
                description: 'Error response',
              },
              responseModels: {
                'application/json': 'ErrorResponse',
              },
            },
          ],
        },
      },
    },
  ],
};
