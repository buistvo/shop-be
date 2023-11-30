import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'GET',
        cors: true,
        path: 'import',
        request: {
          parameters: {
            querystrings: {
              name: true,
            },
          },
        },
        authorizer: {
          name: 'basic-authorizer',
          arn: 'arn:aws:lambda:eu-north-1:979116953403:function:authorization-service-dev-basicAuthorizer',
          resultTtInSeconds: 0,
          identitySource: 'method.request.header.Authorization',
          type: 'token',
        },
      },
    },
  ],
};
