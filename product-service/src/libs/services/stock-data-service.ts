import Stock from '@libs/types/stock';
import { DynamoDB } from './dynamodb-local';

export class StockDataService {
  _dynamodb = new DynamoDB.DocumentClient();

  baseParams = {
    TableName: 'stock',
  };
  async getProductsInStock(): Promise<Stock[]> {
    const params = {
      ...this.baseParams,
      FilterExpression: '#countField > :countValue',
      ExpressionAttributeNames: {
        '#countField': 'count',
      },
      ExpressionAttributeValues: {
        ':countValue': 0,
      },
    };
    const response = await this._dynamodb.scan(params).promise();
    return response.Items as Stock[];
  }
}
