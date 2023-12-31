//import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'product',
        cors: {
          origin: '*',
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
          summary: 'Create product',
          description: 'Create product',
          requestBody: {
            description: 'Create Product body',
            requestModels: {
              'application/json': 'CreateProductRequest',
            },
          },
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
              statusCode: 400,
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
