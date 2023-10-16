import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'GET',
        cors: true,
        path: 'import/{fileName}',
        request: {
          parameters: {
            querystrings: {
              filename: true,
            },
          },
        },
      },
    },
  ],
};
