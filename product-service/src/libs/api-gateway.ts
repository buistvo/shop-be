import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from 'aws-lambda';

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & {
  body: S;
};
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<
  ValidatedAPIGatewayProxyEvent<S>,
  APIGatewayProxyResult
>;

export const formatJSONResponse = (response: unknown | Array<unknown>) => {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': 'https://d16pd4ocp5ok6l.cloudfront.net',
      'Access-Control-Allow-Methods': 'PUT, POST, GET, OPTIONS',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(response),
  };
};

export const errorResponse = (message: string, errorCode = 500) => {
  return {
    statusCode: errorCode,
    headers: {
      'Access-Control-Allow-Origin': 'https://d16pd4ocp5ok6l.cloudfront.net',
      'Access-Control-Allow-Methods': 'PUT, POST, GET, OPTIONS',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({ message }),
  };
};
