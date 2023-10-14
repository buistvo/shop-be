import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import { APIGatewayProxyEvent } from 'aws-lambda';

const hello = async (event: APIGatewayProxyEvent) => {
  return formatJSONResponse({
    message: `Hello ${event.queryStringParameters.fileName}, welcome to the exciting Serverless world!`,
    event,
  });
};

export const main = middyfy(hello);
