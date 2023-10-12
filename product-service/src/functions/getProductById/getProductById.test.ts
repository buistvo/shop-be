import { availableProductsMock } from '@libs/productList';
import { getProductById } from './handler';
import { APIGatewayProxyEvent } from 'aws-lambda/trigger/api-gateway-proxy';

describe('getProductById', () => {
  it('should return product for provided it', async () => {
    const id = '1';
    const expected = {
      body: JSON.stringify(availableProductsMock[0]),
      headers: {
        'Access-Control-Allow-Origin': 'https://d17npkfpw4myuc.cloudfront.net',
      },
      statusCode: 200,
    };
    const event = {
      pathParameters: {
        id,
      },
    } as unknown as APIGatewayProxyEvent;
    expect(await getProductById(event)).toEqual(expected);
  });
});
