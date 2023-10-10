import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from 'aws-lambda';
import type { FromSchema } from 'json-schema-to-ts';

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & {
  body: FromSchema<S>;
};
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<
  ValidatedAPIGatewayProxyEvent<S>,
  APIGatewayProxyResult
>;

export const formatJSONResponse = (response: unknown | Array<unknown>) => {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': 'https://d17npkfpw4myuc.cloudfront.net',
    },
    body: JSON.stringify(response),
  };
};

export const errorResponse = (message: string, errorCode = 500) => {
  return {
    statusCode: errorCode,
    headers: {
      'Access-Control-Allow-Origin': 'https://d17npkfpw4myuc.cloudfront.net',
    },
    body: JSON.stringify({ message }),
  };
};
