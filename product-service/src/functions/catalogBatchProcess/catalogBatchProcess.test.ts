import { catalogBatchProcess } from './handler';
import { ProductValidatorService } from '@libs/services/product-validator-service';
import { ProductDataService } from '@libs/services/product-data-service';
import * as AWS from 'aws-sdk';

jest.mock('@libs/services/product-validator-service');
jest.mock('@libs/services/product-data-service');
jest.mock('aws-sdk');
AWS.DynamoDB.DocumentClient.prototype.get = jest.fn().mockReturnValue({
  promise: jest.fn().mockResolvedValueOnce({}),
});
describe('catalogBatchProcess', () => {
  let mockPublish: jest.Mock;

  beforeEach(() => {
    mockPublish = jest.fn().mockReturnValue({
      promise: jest.fn().mockResolvedValue({}),
    });
    (AWS.SNS.prototype.publish as jest.Mock) = mockPublish;
  });

  it('should process products from SQS and publish to SNS', async () => {
    const mockProduct = { id: '1', name: 'testProduct' };

    const mockValidate = jest.fn();
    (ProductValidatorService.prototype.validate as jest.Mock) = mockValidate;
    mockValidate.mockResolvedValue(undefined);

    const mockCreateProduct = jest.fn();
    (ProductDataService.prototype.createProduct as jest.Mock) =
      mockCreateProduct;
    mockCreateProduct.mockResolvedValue(mockProduct);

    const event = {
      Records: [{ body: JSON.stringify(mockProduct) }],
    };
    process.env.SNS_TOPIC_ARN = 'mockTopicArn';

    await catalogBatchProcess(event as any);

    expect(mockValidate).toHaveBeenCalledWith(mockProduct);
    expect(mockCreateProduct).toHaveBeenCalledWith(mockProduct);
    expect(mockPublish).toHaveBeenCalledWith(
      expect.objectContaining({
        Message: `New product created: ${JSON.stringify(mockProduct)}`,
        Subject: 'New Product Created',
        TopicArn: 'mockTopicArn',
      })
    );
  });
});
