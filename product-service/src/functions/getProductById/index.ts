//import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'product/{id}',
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
          pathParams: [
            {
              name: 'id',
              description: 'Product Id',
              schema: {
                type: 'string',
              },
            },
          ],
          summary: 'Get product by id',
          description: 'Get product by id',
          methodResponses: [
            {
              statusCode: 200,
              responseBody: {
                description: 'Product',
              },
              responseModels: {
                'application/json': 'Product',
              },
            },
            {
              statusCode: 404,
              responseBody: {
                description: 'Error response',
              },
              responseModels: {
                'application/json': 'ErrorResponse',
              },
            },
            {
              statusCode: 500,
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
