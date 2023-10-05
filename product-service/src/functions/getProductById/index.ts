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
          summary: 'Get product by id',
          description: 'Retrieves product by id in path param',
          responses: {
            200: {
              description: 'Success',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/definitions/schemas/AvailableProduct',
                  },
                },
              },
            },
          },
        },
      },
    },
  ],
};