import Product from '@libs/types/product';
import { DynamoDB } from './dynamodb-local';
import { StockDataService } from './stock-data-service';
import AvailableProduct from '@libs/types/availableProduct';

export class ProductDataService {
  _dynamodb = new DynamoDB.DocumentClient();

  baseParams = {
    TableName: 'products',
  };
  async getProductById(id: string): Promise<Product> {
    const params = {
      ...this.baseParams,
      Key: {
        id,
      },
    };
    const response = await this._dynamodb.get(params).promise();
    return response.Item as Product;
  }

  async getProductList(): Promise<Product[]> {
    const response = await this._dynamodb.scan(this.baseParams).promise();
    return response.Items as Product[];
  }

  async getAvailableProductsList(): Promise<AvailableProduct[]> {
    const stocks = await new StockDataService().getProductsInStock();
    if (!stocks.length) return [];
    const params = {
      RequestItems: {
        products: {
          Keys: stocks.map((stock) => ({ id: stock.product_id })),
        },
      },
    };
    const result = await this._dynamodb.batchGet(params).promise();
    const products = result.Responses.products as Product[];
    return products.map((p) => ({
      ...p,
      count: stocks.find((s) => s.product_id === p.id).count,
    }));
  }
}