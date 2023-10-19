//import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  package: {
    include: ['node_modules/swagger-ui-dist/**', './openapi.json'],
  },
  events: [
    {
      http: {
        method: 'get',
        path: 'swagger',
      },
    },
    {
      http: {
        method: 'get',
        path: 'swagger/openapi.json',
      },
    },
    {
      http: {
        method: 'ANY',
        path: 'swagger/{proxy+}',
      },
    },
  ],
};
