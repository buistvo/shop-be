import { availableProductsMock } from '@libs/productList';
import { getProductById } from './handler';
import { APIGatewayProxyEvent } from 'aws-lambda/trigger/api-gateway-proxy';
import { ProductDataService } from '@libs/services/product-data-service';
import * as AWS from 'aws-sdk';
jest.mock('@libs/services/product-data-service');
AWS.DynamoDB.DocumentClient.prototype.get = jest.fn().mockReturnValue({
  promise: jest.fn().mockResolvedValueOnce({}),
});
describe('getProductById', () => {
  let mockGetProductById: jest.Mock;
  beforeEach(() => {
    mockGetProductById = jest.fn().mockResolvedValue(availableProductsMock[0]);
  });
  it('should return product for provided id', async () => {
    (ProductDataService.prototype.getProductById as jest.Mock) =
      mockGetProductById;
    const id = '1';
    const expected = {
      body: JSON.stringify(availableProductsMock[0]),
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
